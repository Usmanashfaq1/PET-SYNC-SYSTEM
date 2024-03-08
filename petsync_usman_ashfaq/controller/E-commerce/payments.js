const express = require('express');
const axios = require('axios');
require('dotenv').config();

const app = express();


app.use(express.json());

const handle_initiate_payment = async (req, res) => {
  try {
    const paymentData = {
      "source": {
        "identifier": "customer@example.com",
        "subtype": "card",
        "token": {
          "token": req.body.cardToken,
          "hashedPan": req.body.hashedPan
        }
      },
      "payment_token": {
        "token": req.body.paymentToken
      },
      "amount_cents": req.body.amount,
      "currency": "PKR"
    };

    const response = await axios.post('https://accept.paymob.com/api/acceptance/payment_keys', paymentData, {
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${process.env.PAYMOB_API_KEY}`
      }
    });

    res.json(response.data);
  } catch (error) {
    console.error('Error initiating payment:', error.message);
    res.status(500).json({ error: 'An error occurred while initiating payment' });
  }
};




const handle_process_payment = (req, res) => {
  // Parse the response data from the payment gateway
  const { paymentStatus, transactionId, amount } = req.body;

  // Handle the response accordingly
  if (paymentStatus === 'success') {
      // Payment was successful, update your database
      // Example: Update order status to 'paid'
      // Example: Send a confirmation email to the customer
  } else {
      // Payment failed or was canceled
      // Example: Update order status to 'failed'
      // Example: Notify the customer about the failed payment
  }

  // Send a response to acknowledge receipt of the payment status
  res.status(200).send('Payment status received successfully.');
};

module.exports = {
  handle_process_payment,
  handle_initiate_payment,
};
