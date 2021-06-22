const express = require('express')
const passport = require('passport')
const jwt = require('jsonwebtoken')
const googleAuthRouter = express.Router();
const models = require('../database/models/');
const response = require('../utils/response')
const {
  transporter,
  authMailing
} = require('../mailingMid/NodemailerGoogleMid')
const { mailSignUp } = require('../utils/mailtemplates');

const {
  SALT_ROUNDS,
  GOOGLE_MAIL,
  SECRET_KEY_JWT,
} = process.env

googleAuthRouter.get('/signin', passport.authenticate('google', { session: false, scope: ['profile', 'email'] }))

googleAuthRouter.get('/callback', passport.authenticate('google', { 
    session: false, 
    failureRedirect: 'http://localhost:3000/authentication/google/error',
    // successRedirect: 
   }),
    
  (req, res) => {

    if(req.user[1]) {
      const jasonWebToken = jwt.sign({id: req.user[0].id, email: req.user[0].email}, SECRET_KEY_JWT);
      //send email confirmation

      const {
        email,
        name,
        lastName,
      } = req.user[0];

      transporter.sendMail({
        from: `Onion Food Sup. <${GOOGLE_MAIL}>`,
        to: email,
        subject: 'Welcome to Onion Food Sup.',
        html: mailSignUp(name, lastName, email),
        auth: authMailing,
      });

      res.cookie('jwt', jasonWebToken).cookie('newUser', 'true').redirect('http://localhost:3000/authentication/google/success')
    }
    const jasonWebToken = jwt.sign({id: req.user[0].id, email: req.user[0].email}, SECRET_KEY_JWT)
    res.cookie('jwt', jasonWebToken).redirect('http://localhost:3000/authentication/google/success')
  }
);

googleAuthRouter.post('/setnewcart', passport.authenticate('jwt', {session: false}), async (req, res, next) => {
  const user = req.user
  const { cart } =req.body
  const cartProductsIdArray = cart.map(p => p.id)
  try {
    const firstUserOrder = await models.Order.create({
      userId: user.id,
      status: "created",
      createdAt: new Date(),
      updatedAt: new Date(),
      total: 0, 
    })

    const orderItemsArrayData = cart.map(p => {
      return {
          ProductId: p.id,
          OrderId: firstUserOrder.id,
          quantity: p.quantity,
          subtotal: ((p.quantity * p.price).toFixed(2)),
          createdAt: new Date(),
          updatedAt: new Date() 
      }
    })

    await models.OrderItem.bulkCreate(orderItemsArrayData);
    const newCartData = await models.Product.findAll({ 
      where: {id: cartProductsIdArray},
      include: [{
          model: models.Order,
          where: { id: firstUserOrder.id }
        },
        {
          model: models.Image,
        }],
    })

    const newCart = newCartData.map(p => {
      return {
          id: p.id,
          name: p.name,
          description: p.description,
          price: p.price,
          stock: p.stock,
          Images: p.Images,
          quantity: p.Orders[0].OrderItem.quantity,
      }
    })

    const newTotal = newCart.map(p => p.price * p.quantity).reduce((acc, v) => acc + v)
    firstUserOrder.total = newTotal
    await firstUserOrder.save()

   response.success(req, res, {cart: newCart})

  } catch (error) {
    console.log(error)
    response.error(req, res, error)
  }


})

googleAuthRouter.post('/getcart', passport.authenticate('jwt', {session: false}), async (req, res, next) => {
  const user = req.user
  const localCart = req.body.localCart
  console.log(localCart)

    try {
      let orderValidation = await models.Order.findOne({
        where: {
            status: 'created',
            userId: user.id,
        },
      })
    
      let cartProductsIdArray = []
      let orderItems = false
    
      if(orderValidation) {
        orderItems = await models.OrderItem.findAll({
            where: {
                OrderId: orderValidation.id,
            }, 
        })
      }

      if(!orderValidation) {
        orderValidation = await models.Order.create({
            userId: user.id,
            status: "created",
            createdAt: new Date(),
            updatedAt: new Date(),
            total: 0, 
        })
      }

      if(orderItems) {
        cartProductsIdArray = orderItems.map(p => p.ProductId)
      }
      
      if(orderItems.length === 0 && localCart?.length > 0) {
        cartProductsIdArray = localCart.map(p => p.id)
        const orderItemsArrayData = localCart.map(p => {
            return {
                ProductId: p.id,
                OrderId: orderValidation.id,
                quantity: p.quantity,
                subtotal: ((p.quantity * p.price).toFixed(2)),
                createdAt: new Date(),
                updatedAt: new Date() 
            }
        })
        orderItems = await models.OrderItem.bulkCreate(orderItemsArrayData);
      }

      if(orderItems.length > 0 && localCart?.length > 0) {
        const existingProductsId = []
        const modifiedOrderItems = []
     
        orderItems.forEach((orderItem) => {
            const validateProduct = localCart.find(p => p.id === orderItem.ProductId)
            if(validateProduct) {
                existingProductsId.push(orderItem.ProductId)
                orderItem.quantity = (orderItem.quantity + validateProduct.quantity) > validateProduct.stock ? Number(validateProduct.stock) : orderItem.quantity + validateProduct.quantity
                orderItem.subtotal = orderItem.quantity * Number(validateProduct.price)
                modifiedOrderItems.push(orderItem)
            }
        })

        modifiedOrderItemsPromiseArray = modifiedOrderItems.map(moi => moi.save())

        await Promise.all(modifiedOrderItemsPromiseArray)

        const newProductsInCart = []
        localCart.forEach(p => {
            if(!existingProductsId.includes(p.id)) {
                newProductsInCart.push({
                    ProductId: p.id,
                    OrderId: orderValidation.id,
                    quantity: p.quantity,
                    subtotal: ((p.quantity * p.price).toFixed(2)),
                    createdAt: new Date(),
                    updatedAt: new Date() 
                })
            }
        })
        if(newProductsInCart.length > 0) {
            await models.OrderItem.bulkCreate(newProductsInCart);
        }
        orderItems = await models.OrderItem.findAll({
            where: {
                OrderId: orderValidation.id,
            }, 
        })
      }

      let cart = false 
      
      if(orderItems) {
        cartProductsIdArray = orderItems.map(p => p.ProductId)
        orderValidation.total = orderItems.reduce((acc, oi) => acc + Number(oi.subtotal), 0)
        await orderValidation.save()
        const cartData = await models.Product.findAll({ 
            where: {id: cartProductsIdArray},
            include: [{
                model: models.Order,
                where: { id: user.id }
              },
              {
                model: models.Image,
              }],
          })

        cart = cartData.map(p => {
            return {
                id: p.id,
                name: p.name,
                description: p.description,
                price: p.price,
                stock: p.stock,
                Images: p.Images,
                quantity: p.Orders[0].OrderItem.quantity,
            }
        })
      }
      response.success(req, res, {cart})

    } catch (error) {
      console.log(error)
      response.error(req, res, {message: 'Couldn`t connect to the server'})
    }

  
})

module.exports = googleAuthRouter