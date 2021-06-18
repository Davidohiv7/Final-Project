const express = require('express')
const response = require('../utils/response')
const passport = require('passport')
const models = require('../database/models/');

const router = express.Router();

const transporter = require('../mailingMid/NodemailerGoogleMid')
const authMailing = require('../mailingMid/NodemailerGoogleMid')
const {
    mailBuy
} = require('../utils/mailtemplates');
const {
    GOOGLE_MAIL,
} = process.env

router.get('/gettotal', passport.authenticate('jwt', {session: false}), async (req, res, next) => {
    const user = req.user
    
    try {
        const order = await models.Order.findOne({
            where: {
                status: 'created',
                userId: user.id,
            },
        }) 

        response.success(req, res, { total: order.total })

    } catch (error) {
        console.log(error)
        response.error(req, res, error)
    }
})

router.post('/setshippingaddress', passport.authenticate('jwt', {session: false}), async (req, res, next) => {
    const user = req.user
    const data = req.body
    
    try {
        const order = await models.Order.findOne({
            where: {
                status: 'created',
                userId: user.id,
            },
        }) 

        order.city = data.city
        order.zip = data.zip
        order.street = data.street
        order.neighborhood = data.neighborhood
        await order.save()

        const shippingAddress = {
            city: order.city,
            zip: order.zip,
            street: order.street,
            neighborhood: order.neighborhood,
        }

        response.success(req, res, { shippingAddress})

    } catch (error) {
        console.log(error)
        response.error(req, res, error)
    }
})

router.post('/confirmpayment', passport.authenticate('jwt', {session: false}), async (req, res, next) => {
    const user = req.user
    const checkoutData = req.body
    
    try {
        const order = await models.Order.findOne({
            where: {
                status: 'created',
                userId: user.id,
            },
        }) 

        if(checkoutData.payment.state) {
            order.status = 'paid'
            order.paymentMethod = checkoutData.payment.method
            await order.save()
            //send email confirmation

            transporter.sendMail({
                from: `Onion Food Sup. <${GOOGLE_MAIL}>`,
                to: user.email,
                subject: 'Welcome to Onion Food Sup.',
                html: mailBuy(user.name, order),
                auth: authMailing,
            });
        }
        const paidOrder = await models.Order.findOne({
            where: {
                id: order.id,
                userId: user.id,
            },
        })
           
        const paymentStatus = {
            status: paidOrder.status,
            paymentMethod: paidOrder.paymentMethod
        }

        response.success(req, res, { paymentStatus })

    } catch (error) {
        console.log(error)
        response.error(req, res, error)
    }
})


module.exports = router



