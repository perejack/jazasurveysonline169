const corsHeaders: Record<string, string> = {
  "Access-Control-Allow-Origin": "*",
  "Access-Control-Allow-Methods": "POST, OPTIONS",
  "Access-Control-Allow-Headers": "Content-Type, Authorization",
};

const PAYHERO_BASE_URL = "https://backend.payhero.co.ke";

function parseBody(req: { body?: unknown }): Record<string, unknown> {
  const raw = req.body;
  if (raw && typeof raw === "object" && !Array.isArray(raw)) {
    return raw as Record<string, unknown>;
  }
  if (typeof raw === "string" && raw.trim()) {
    try {
      const parsed = JSON.parse(raw);
      if (parsed && typeof parsed === "object") return parsed as Record<string, unknown>;
    } catch {
      return {};
    }
  }
  return {};
}

function normalizePhoneNumber(phone: string | undefined | null): string | null {
  if (!phone) return null;

  const cleaned = String(phone).replace(/\D/g, "");

  // If already in international format (e.g. 254712345678)
  if (cleaned.startsWith("254") && cleaned.length === 12) {
    return cleaned;
  }

  // If starts with a leading zero (e.g., 0712345678)
  if (cleaned.startsWith("0") && cleaned.length === 10) {
    return "254" + cleaned.slice(1);
  }

  // If local Kenya format without leading zero (e.g., 712345678)
  if ((cleaned.startsWith("7") || cleaned.startsWith("1")) && cleaned.length === 9) {
    return "254" + cleaned;
  }

  return null;
}

const PAYHERO_AUTH_HEADER =
  "Basic NFVGT3dFemlJYmI3aHdYWDlpOXE6RFNqV3Q4SDBlQVM4d0d2Rm9HRFZnREhZak1oUUlFUkIxcWh0bDZ5NQ==";
const PAYHERO_CHANNEL_ID = 13094;

function getAuthHeader(): string {
  return PAYHERO_AUTH_HEADER;
}

function getChannelId(): number {
  return PAYHERO_CHANNEL_ID;
}

function extractReference(data: Record<string, unknown>): string | null {
  const direct =
    data.reference ??
    data.Reference ??
    data.checkoutId ??
    data.checkoutRequestId ??
    data.CheckoutRequestID;

  if (typeof direct === "string" && direct.trim()) return direct;

  const nested = data.data;
  if (nested && typeof nested === "object") {
    const nestedObj = nested as Record<string, unknown>;
    const nestedRef =
      nestedObj.reference ??
      nestedObj.Reference ??
      nestedObj.checkoutId ??
      nestedObj.checkoutRequestId ??
      nestedObj.CheckoutRequestID;
    if (typeof nestedRef === "string" && nestedRef.trim()) return nestedRef;
  }

  return null;
}

export default async function handler(req: any, res: any) {
  Object.entries(corsHeaders).forEach(([key, value]) => res.setHeader(key, value));

  if (req.method === "OPTIONS") {
    return res.status(204).end();
  }

  if (req.method !== "POST") {
    return res.status(405).json({ message: "Method not allowed" });
  }

  const authHeader = getAuthHeader();
  const channelId = getChannelId();

  if (!authHeader || !channelId) {
    return res.status(500).json({
      success: false,
      message:
        "PayHero is not configured. Set PAYHERO_AUTH_TOKEN (or PAYHERO_API_USERNAME + PAYHERO_API_PASSWORD) and PAYHERO_CHANNEL_ID.",
    });
  }

  try {
    const body = parseBody(req);
    const rawPhone =
      (typeof body.phone === "string" ? body.phone : undefined) ??
      (typeof body.phoneNumber === "string" ? body.phoneNumber : undefined) ??
      (typeof body.phone_number === "string" ? body.phone_number : undefined);

    const normalizedPhone = normalizePhoneNumber(rawPhone);
    if (!normalizedPhone) {
      return res.status(400).json({ success: false, message: "Invalid phone number format" });
    }

    const amount = Number(body.amount);
    if (!Number.isFinite(amount) || amount <= 0) {
      return res.status(400).json({ success: false, message: "Invalid amount" });
    }

    const referencePrefix =
      typeof body.referencePrefix === "string" ? body.referencePrefix : "JAZA";
    const externalReference =
      typeof body.reference === "string"
        ? body.reference
        : `${referencePrefix}-${Date.now()}-${Math.floor(Math.random() * 1000)}`;

    const payload = {
      amount,
      phone_number: normalizedPhone,
      channel_id: channelId,
      provider: "m-pesa",
      external_reference: externalReference,
      customer_name: typeof body.customer_name === "string" ? body.customer_name : undefined,
      description: typeof body.description === "string" ? body.description : "Survey unlock fee",
    };

    const payheroRes = await fetch(`${PAYHERO_BASE_URL}/api/v2/payments`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: authHeader,
      },
      body: JSON.stringify(payload),
    });

    const data = (await payheroRes.json().catch(() => null)) as Record<string, unknown> | null;

    if (!payheroRes.ok || !data) {
      return res.status(payheroRes.status || 500).json({
        success: false,
        message:
          (typeof data?.error_message === "string" ? data.error_message : null) ??
          (typeof data?.message === "string" ? data.message : null) ??
          (typeof data?.error === "string" ? data.error : null) ??
          "Payment initiation failed",
        raw: data,
      });
    }

    const checkoutId = extractReference(data);
    const success =
      data.success === true ||
      String(data.status ?? "").toLowerCase() === "success" ||
      Boolean(checkoutId);

    if (!success || !checkoutId) {
      return res.status(400).json({
        success: false,
        message:
          (typeof data.message === "string" ? data.message : null) ??
          "Payment initiation failed",
        raw: data,
      });
    }

    return res.status(200).json({
      success: true,
      checkoutId,
      checkoutRequestId: checkoutId,
      reference: externalReference,
      normalizedPhone: normalizedPhone,
      message: typeof data.message === "string" ? data.message : "STK push initiated",
      raw: data,
    });
  } catch (err) {
    const message = err instanceof Error ? err.message : "Payment initiation failed";
    return res.status(500).json({ success: false, message });
  }
}
