const express = require('express')
const router = express.Router();
const models = require('../database/models/');
const passport = require('passport');
const Stripe = require('stripe')
const response = require('../utils/response');
const { STRIPE_SECRET_KEY } = process.env
const { Op } = require("sequelize");

const stripe = new Stripe(STRIPE_SECRET_KEY)

const {
    transporter,
    authMailing
} = require('../mailingMid/NodemailerGoogleMid')
const {
    mailBuy,
    mailDispatched
} = require('../utils/mailtemplates');
const {
    GOOGLE_MAIL,
} = process.env


router.post('/confirm_order', passport.authenticate('jwt', {session: false}), async (req, res) => {
    const user = req.user
    const { cart } = req.body

    const cartProductsIdArray = cart.map(p => p.id)
    
    try {
        //Find order
        const order = await models.Cart.findOne({
            where: {
                status: 'paid',
                personId: user.id,
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

        const verifyOrder = await models.Cart.findOne({
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
                subject: 'Your order is in process',
                html: mailBuy(user.name, order, cart),
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



router.post('/payment/stripe', async (req, res) => {

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

router.post('/products', passport.authenticate('jwt', {session: false}), async (req, res) => {

    const user = req.user
    const { order } = req.body

    try {

        const orderItems = await models.CartItem.findAll({
            where: {
                CartId: order.id,
            },
        })

        const orderProductsIdArray = orderItems.map(p => p.ProductId)


        const productData = await models.Product.findAll({ 
            where: {id: orderProductsIdArray},
            include: [{
                model: models.Image,
            }, 
            {
                model: models.Review,
                required: false,
                where: { personId: user.id },
            }],
        })


        const orderData = productData.map(p => {
            const orderProductData = orderItems.find(oi => oi.ProductId === p.id)
            return {product: p, orderProductData}
        })
        
        response.success(req, res, {orderData})

    } catch (error) {
        console.log(error)
        response.error(req, res, {paymentStatus: false, message: 'Couldn`t find products'})
    } 
  }
); 


router.get('/', async (req, res) => {
    try {
        let { status, page = 1, limit = 8 } = req.query;

        if (status === "") status = null;

        if (!status) {
            const { count } = await models.Cart.findAndCountAll();

            if (count === 0) return response.success(req, res,  {orders: []}, 200);
    
            const data = {};
            let pages = Math.ceil(count / limit);
            if (page > pages) page = pages;
            const pageNumber = parseInt(page)
            let startIndex = (page - 1) * limit;
            let endIndex = page * limit;
            if (endIndex < count) data.nextPage = pageNumber + 1;
            if (startIndex > 0) data.previousPage = pageNumber - 1;

            const orders = await models.Cart.findAll({
                limit: limit,
                offset: (page * limit) - limit,
            });

            return response.success(req, res, { ...data, count, pages, pageNumber, orders }, 200);
        }
        status = status.toLowerCase()
        const { count } = await models.Cart.findAndCountAll({
            where: { status: status }
        });
    
        if (count === 0) return response.success(req, res, {orders: []}, 200);
    
        const data = {};
        let pages = Math.ceil(count / limit);
        if (page > pages) page = pages;
        const pageNumber = parseInt(page)
        let startIndex = (page - 1) * limit;
        let endIndex = page * limit;
        if (endIndex < count) data.nextPage = pageNumber + 1;
        if (startIndex > 0) data.previousPage = pageNumber - 1;

        const orders = await models.Cart.findAll({
            where: { status: status },
            limit: limit,
            offset: (page * limit) - limit,
        });

        response.success(req, res, { ...data, count, pages, pageNumber, orders }, 200);

    } catch (error) {
        response.error(req, res, {orders: []}, 500);
    }

})

router.patch('/', async (req, res) => {
    try {
        let { id, status } = req.body;
        const order = await models.Cart.findOne({
            where: { id: id },
            include: {
                model: models.Person,
                attributes: ['name', 'lastName', 'email']
            }
        });
        if (!order) return response.success(req, res, { message: "Order not found."}, 200);
        if (order.status === status.toLowerCase()) return response.success(req, res, {message: "Order is already in this status."}, 200);
        
        order.status = status.toLowerCase();
        await order.save();

        //Mailing when dispatched
        if(order.status === 'completed') {
            const {
                name,
                lastName,
                email
            } = order.Person.dataValues;

            transporter.sendMail({
                from: `Onion Food Sup. <${GOOGLE_MAIL}>`,
                to: email,
                subject: `Your order ${order.dataValues.id} has been dispatched`,
                html: mailDispatched(name, lastName, order.dataValues),
                auth: authMailing,
            });

        }
        response.success(req, res, { message: "Order updated successfully." });

    } catch (error) {
        response.error(req, res, error);
    }
})

router.get('/:id', async (req, res) => {
    try {
        const { id } = req.params;
        const order = await models.Cart.findOne({ where: { id: id } });
        if (!order) return response.success(req, res, { message: "Order not found." }, 404);
        response.success(req, res, order);
    } catch (error) {
        response.error(req, res, error);
    }
})

module.exports = router;

