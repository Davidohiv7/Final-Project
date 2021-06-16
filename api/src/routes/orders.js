const express = require('express')
const ordersRouter = express.Router();
const Stripe = require('stripe')
const response = require('../utils/response');
const { STRIPE_SECRET_KEY } = process.env

const stripe = new Stripe(STRIPE_SECRET_KEY)

ordersRouter.post('/payment/stripe', async (req, res) => {

    const { paymentId, subtotal } = req.body

    try {
        const payment = await stripe.paymentIntents.create({
            amount: subtotal,
            currency: 'USD',
            description: 'Onion order',
            payment_method: paymentId,
            confirm: true
        })
        if(payment.status === 'succeeded') {
            return response.success(req, res, {paymentStatus: true})
        }
        response.error(req, res, {paymentStatus: false, message: 'Sorry we couldn`t complete the transaction'})
    } catch (error) {
        response.error(req, res, {paymentStatus: false, message: error.raw.message})
    } 
  }
); 

module.exports = ordersRouter