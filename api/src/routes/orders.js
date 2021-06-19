const express = require('express')
const ordersRouter = express.Router();
const models = require('../database/models/');
const passport = require('passport');
const Stripe = require('stripe')
const response = require('../utils/response');
const { STRIPE_SECRET_KEY } = process.env

const stripe = new Stripe(STRIPE_SECRET_KEY)

const {
    transporter,
    authMailing
} = require('../mailingMid/NodemailerGoogleMid')
const {
    mailBuy
} = require('../utils/mailtemplates');
const {
    GOOGLE_MAIL,
} = process.env


ordersRouter.post('/confirm_order', passport.authenticate('jwt', {session: false}), async (req, res) => {
    const user = req.user
    const { subtotal, customerInformation, cart } = req.body

    const cartProductsIdArray = cart.map(p => p.id)
    
    try {
        //Find order
        const order = await models.Order.findOne({
            where: {
                status: 'paid',
                userId: user.id,
            },
        }) 

        //Update stocks
        const oldProductsArray = await models.Product.findAll({ 
            where: { id: cartProductsIdArray }, 
          })

        oldProductsArray.forEach(op => {
            const cartProduct = cart.find(p => p.id === op.id)
            op.stock = op.stock - cartProduct.quantity
        })

        const saveNewStockPromiseArray = oldProductsArray.map(op => op.save())

        await Promise.all(saveNewStockPromiseArray)

        //Update new order status to create

        order.status = "progress"
        await order.save()

        const verifyOrder = await models.Order.findOne({
            where: {
                status: "progress",
                id: order.id,
            },
        }) 

        // const verifyStock = await models.Product.findAll({ 
        //     where: { id: cartProductsIdArray }, 
        // })

        if(verifyOrder) {
            //send email confirmation

            transporter.sendMail({
                from: `Onion Food Sup. <${GOOGLE_MAIL}>`,
                to: user.email,
                subject: 'Welcome to Onion Food Sup.',
                html: mailBuy(user.name, order),
                auth: authMailing,
            });
            return response.success(req, res, { 
                message: `The order ${order.id} was successfully created for customer ${user.name} ${user.lastName}`, 
                result: true,
                verifyOrder
            })
        }
        response.error(req, res, {
            message: 'There was a problem with the order creation, try again', 
            result: false})

    } catch (error) {
        console.log(error)
        response.error(req, res, {
            message: 'There was a problem with the order creation, try again', 
            result: false})
    }
})



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