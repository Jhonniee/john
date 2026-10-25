const express = require('express');
const bodyParser = require('body-parser');
const axios = require('axios');
const dotenv = require('dotenv');
const path = require('path');

dotenv.config();

const app = express();
const PORT = process.env.PORT || 3000;
const PAYSTACK_SECRET_KEY = process.env.PAYSTACK_SECRET_KEY;

if (!PAYSTACK_SECRET_KEY) {
  console.warn('WARNING: PAYSTACK_SECRET_KEY is not configured in backend/.env or environment variables.');
}

app.use(bodyParser.json());

// Serve static frontend (one level up)
app.use('/', express.static(path.join(__dirname, '..')));

// Simple webhook endpoint for Paystack events (simulate handling)
app.post('/webhook/paystack', (req, res) => {
  console.log('Received Paystack webhook:', req.body);
  // TODO: verify signature in production
  // For demo: accept and log
  res.status(200).json({ received: true });
});

const paystackPlans = {
  'pro-monthly': {
    name: 'FixTogether Pro',
    amount: 49900,
    currency: 'NGN',
    description: 'Unlimited diagnostics, AI repair blueprints, and live global hubs.'
  },
  'elite-monthly': {
    name: 'FixTogether Elite',
    amount: 499900,
    currency: 'NGN',
    description: 'Premium fleet access, priority onboarding, and enterprise-level insights.'
  },
  lifetime: {
    name: 'FixTogether Lifetime',
    amount: 1299900,
    currency: 'NGN',
    description: 'One-time lifetime access to all premium tools.'
  },
  'single-fix': {
    name: 'FixTogether Single Fix',
    amount: 199900,
    currency: 'NGN',
    description: 'One-off service to diagnose and repair a single device.'
  }
};

app.get('/create-checkout', async (req, res) => {
  if (!PAYSTACK_SECRET_KEY) {
    return res.status(500).send('Paystack secret key is not configured.');
  }

  const planKey = req.query.plan || 'pro-monthly';
  const mode = req.query.mode === 'foreign' ? 'foreign' : 'local';
  const email = req.query.email || 'customer@fixtogether.app';
  const plan = paystackPlans[planKey] || paystackPlans['pro-monthly'];
  const callbackUrl = `${req.protocol}://${req.get('host')}/paystack/callback?plan=${planKey}&mode=${mode}`;

  try {
    const response = await axios.post(
      'https://api.paystack.co/transaction/initialize',
      {
        email,
        amount: plan.amount,
        currency: plan.currency,
        callback_url: callbackUrl,
        metadata: {
          plan: planKey,
          mode
        }
      },
      {
        headers: {
          Authorization: `Bearer ${PAYSTACK_SECRET_KEY}`,
          'Content-Type': 'application/json'
        }
      }
    );

    const authorizationUrl = response?.data?.data?.authorization_url;
    if (!authorizationUrl) {
      console.error('Paystack response missing authorization_url:', response?.data);
      return res.status(500).send('Paystack initialization failed.');
    }

    res.redirect(authorizationUrl);
  } catch (error) {
    console.error('Paystack initialization error:', error.response ? error.response.data : error.message);
    res.status(500).send('Paystack initialization failed.');
  }
});

app.get('/paystack/callback', (req, res) => {
  res.sendFile(path.join(__dirname, '..', 'index.html'));
});

app.listen(PORT, () => {
  console.log(`FixTogether backend listening on http://localhost:${PORT}`);
});
