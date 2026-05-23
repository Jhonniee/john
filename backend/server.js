const express = require('express');
const bodyParser = require('body-parser');
const path = require('path');

const app = express();
const PORT = process.env.PORT || 3000;

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

// Quick endpoint to create a redirect checkout (server-side mapping)
app.get('/create-checkout', (req, res) => {
  const { plan = 'pro-monthly', mode = 'local' } = req.query;
  const mapping = {
    'pro-monthly': 'https://paystack.shop/pay/mzzr-s3h1p?plan=pro-monthly',
    'elite-monthly': 'https://paystack.shop/pay/mzzr-s3h1p?plan=elite-monthly',
    'lifetime': 'https://paystack.shop/pay/mzzr-s3h1p?plan=lifetime',
    'single-fix': 'https://paystack.shop/pay/mzzr-s3h1p?plan=single-fix'
  };
  const url = mapping[plan] + `&mode=${mode}`;
  res.redirect(url);
});

app.listen(PORT, () => {
  console.log(`FixTogether backend listening on http://localhost:${PORT}`);
});
