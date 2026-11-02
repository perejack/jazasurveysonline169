// Vercel serverless function for STK Push via SwiftPay
// Uses standard Request/Response - @vercel/node types are provided in production

// Hardcoded credentials for testing
const SWIFTPAY_BASE_URL = 'https://swiftpay-backend-uvv9.onrender.com';
const SWIFTPAY_API_KEY = 'sp_2eeffc3d-eab8-4807-b19e-cc4b2acf13c5';
const SWIFTPAY_TILL_ID = '92189482-2637-4af1-a0f4-cb7974ef7b4e';

export default async function handler(req, res) {
  // Enable CORS
  res.setHeader('Access-Control-Allow-Credentials', 'true');
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Methods', 'GET,OPTIONS,PATCH,DELETE,POST,PUT');
  res.setHeader('Access-Control-Allow-Headers', 'X-CSRF-Token, X-Requested-With, Accept, Accept-Version, Content-Length, Content-MD5, Content-Type, Date, X-Api-Version, Authorization');

  if (req.method === 'OPTIONS') {
    res.status(200).end();
    return;
  }

  if (req.method !== 'POST') {
    return res.status(405).json({ error: 'Method not allowed' });
  }

  try {
    if (!SWIFTPAY_API_KEY || !SWIFTPAY_TILL_ID) {
      return res.status(500).json({
        success: false,
        error: 'Server misconfiguration: missing SWIFTPAY_API_KEY or SWIFTPAY_TILL_ID',
      });
    }

    const { phone_number, amount, till_id, reference, description } = req.body;

    if (!phone_number || !amount) {
      return res.status(400).json({ error: 'Phone number and amount are required' });
    }

    // Call SwiftPay STK Push API
    const response = await fetch(`${SWIFTPAY_BASE_URL}/api/mpesa/stk-push-api`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${SWIFTPAY_API_KEY}`,
      },
      body: JSON.stringify({
        phone_number,
        amount: Number(amount),
        till_id: till_id || SWIFTPAY_TILL_ID,
        reference: reference || `REF${Date.now()}`,
        description: description || 'Payment',
      }),
    });

    const data = await response.json();

    if (!response.ok || data.status === 'error') {
      return res.status(response.status || 400).json({
        success: false,
        error: data.message || 'Failed to initiate STK push',
      });
    }

    return res.status(200).json({
      success: true,
      checkoutRequestId: data.data?.checkout_id,
      merchantRequestId: data.data?.merchant_request_id,
      responseDescription: data.responseDescription || data.message,
      customerMessage: data.customerMessage,
    });
  } catch (error) {
    console.error('STK Push Error:', error);
    return res.status(500).json({
      success: false,
      error: error instanceof Error ? error.message : 'Internal server error',
    });
  }
}
