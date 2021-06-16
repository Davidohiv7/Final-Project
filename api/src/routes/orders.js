const express = require('express')
const ordersRouter = express.Router();
const models = require('../database/models/');
const Stripe = require('stripe')
const response = require('../utils/response');
const { STRIPE_SECRET_KEY } = process.env

const stripe = new Stripe(STRIPE_SECRET_KEY)


ordersRouter.post('/confirm_order', async (req, res) => {
    const { subtotal, customerInformation, cart } = req.body

    const cartProductsIdArray = cart.map(p => p.id)

    const orderCustomer = {
        name: customerInformation.name,
        lastName: customerInformation.lastName,
        email: customerInformation.email,
        createdAt: new Date(),
        updatedAt: new Date() 
    }

    const orderShippingAddress = {
        city: customerInformation.city,
        zip: customerInformation.zip,
        street: customerInformation.street,
        neighborhood: customerInformation.neighborhood ? customerInformation.neighborhood : null,
        createdAt: new Date(),
        updatedAt: new Date() 
    }

    //Due to security reasons, it's created in cancelled, and when all the relations are set correctly
    //the status is changed to created. To avoid create repeated orders

    const newOrder = {
        status: "cancelled",
        total: Number(subtotal),
        createdAt: new Date(),
        updatedAt: new Date() 
    }
    
    try {
        //Create customer
        const customer = await models.Customer.findOrCreate({where: { email: customerInformation.email}, defaults: orderCustomer})
        //Create shipping address
        orderShippingAddress.customerId = customer[0].id
        const shippingAddress = await models.ShippingAddress.create(orderShippingAddress)
        //Create order
        newOrder.customerId = customer[0].id
        const order = await models.Order.create( newOrder ) 
        //Create relations between products and order
        const orderItemArrayData = cart.map(p => {
            return {
                ProductId: p.id,
                OrderId: order.id,
                quantity: p.quantity,
                subtotal: ((p.quantity * p.price).toFixed(2)),
                createdAt: new Date(),
                updatedAt: new Date() 
            }
        })
        const newOrderItems = await models.OrderItem.bulkCreate(orderItemArrayData);
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

        //Update new order status to create, this is for security

        order.status = "created"
        await order.save()

        const verifyOrder = await models.Order.findOne({where: {id: order.id}})

        // const verifyStock = await models.Product.findAll({ 
        //     where: { id: cartProductsIdArray }, 
        // })

        if(verifyOrder.status === 'created') {
            return response.success(req, res, { 
                message: `The order ${order.id} was successfully created for customer ${customer[0].name} ${customer[0].lastName}`, 
                result: true,
                // verifyStock
            })
        }
        response.error(req, res, {
            message: 'There was a problem with the order creation, try again', 
            result: false})
    } catch (error) {
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