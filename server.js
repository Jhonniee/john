const express = require('express');
const axios = require('axios');
const cors = require('cors');

const app = express();
app.use(cors());
app.use(express.json());

// 🔒 Paystack Authorization Key
// NOTE: For testing purposes, make sure this starts with 'sk_test_' from your Paystack Dashboard
const PAYSTACK_SECRET_KEY = 'sk_live_8aa4c9652841c659d7eda3579fe037af20cd2f8d'; 

app.post('/api/initialize-payment', async (req, res) => {
  try {
    const { email, amount, currency, metadata } = req.body;

    // Validate that required fields exist
    if (!email || !amount) {
      return res.status(400).json({ error: 'Missing email or amount fields' });
    }

    const response = await axios.post(
      'https://api.paystack.co/transaction/initialize',
      { 
        email: email, 
        amount: Math.round(amount * 100), // Paystack reads amounts in kobo/cents (Multiply by 100)
        currency: currency || 'NGN', 
        metadata: metadata 
      },
      {
        headers: {
          Authorization: `Bearer ${PAYSTACK_SECRET_KEY}`,
          'Content-Type': 'application/json'
        }
      }
    );
    
    // Return the response back to your frontend checkout link
    res.json(response.data);
  } catch (error) {
    console.error('Paystack API Error Response:', error.response ? error.response.data : error.message);
    res.status(500).json({ 
      error: 'Failed to initialize secure checkout portal.',
      details: error.response ? error.response.data.message : error.message 
    });
  }
});

app.listen(3000, () => console.log('🚀 Secure FixTogether Backend Core online at http://localhost:3000'));