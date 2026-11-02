// Vercel serverless function for Payment Status via SwiftPay
// Uses standard Request/Response - @vercel/node types are provided in production

// Hardcoded credentials for testing
const SWIFTPAY_BASE_URL = 'https://swiftpay-backend-uvv9.onrender.com';

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

  if (req.method !== 'GET') {
    return res.status(405).json({ error: 'Method not allowed' });
  }

  try {
    const { checkoutRequestId } = req.query;

    if (!checkoutRequestId || typeof checkoutRequestId !== 'string') {
      return res.status(400).json({ error: 'checkoutRequestId is required' });
    }

    const response = await fetch(`${SWIFTPAY_BASE_URL}/api/mpesa-verification-proxy`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ checkoutId: checkoutRequestId }),
    });

    const data = await response.json();

    if (!response.ok) {
      return res.status(response.status).json({
        success: false,
        error: data.message || 'Failed to get payment status',
      });
    }

    // Map SwiftPay response to our format
    const successStatuses = ['completed', 'success', 'paid', 'succeeded'];
    const failedStatuses = ['failed', 'cancelled', 'rejected'];
    const status = data.payment?.status?.toLowerCase() || 'pending';
    
    return res.status(200).json({
      success: true,
      status: status,
      resultCode: successStatuses.includes(status) ? 0 : (failedStatuses.includes(status) ? 1 : null),
      resultDesc: data.payment?.resultDesc || data.message,
      amount: data.payment?.amount,
      mpesaReceiptNumber: data.payment?.mpesaReceiptNumber,
      transactionDate: data.payment?.transactionDate,
      phoneNumber: data.payment?.phoneNumber,
      payment: data.payment,
    });
  } catch (error) {
    console.error('Payment Status Error:', error);
    return res.status(500).json({
      success: false,
      error: error instanceof Error ? error.message : 'Internal server error',
    });
  }
}
