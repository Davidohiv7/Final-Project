const express = require('express')
const jwt = require('jsonwebtoken')
const response = require('../utils/response')
const signUpRouter = express.Router();
const bcrypt = require('bcrypt');
const {
    transporter,
    authMailing
} = require('../mailingMid/NodemailerGoogleMid')
const { mailSignUp } = require('../utils/mailtemplates');
const models = require('../database/models/');

const {
    SECRET_KEY_JWT,
    SALT_ROUNDS,
    GOOGLE_MAIL,
} = process.env

signUpRouter.get('/', (req, res, next) => {
    res.send('Esta es la ruta de sign up')
})
  
signUpRouter.post('/', async (req, res, next) => {
    const newUserData = req.body
    const saltRounds = Number(SALT_ROUNDS)
    try {
        const checkedUser = await models.Person.findOne({where: {
            email: newUserData.email
            }
        })
        if(checkedUser) {
            return response.error(req, res, {message: 'This email is already taken'})
        }

        const hashedPassword = bcrypt.hashSync(newUserData.password, saltRounds);

        const newUser = await models.Person.create({
            ...newUserData,
            password: hashedPassword,
            role: "customer",
            createdAt: new Date(),
            updatedAt: new Date() 
        })

        const firstUserOrder = await models.Cart.create({
            personId: newUser.id,
            status: "created",
            createdAt: new Date(),
            updatedAt: new Date(),
            total: 0, 
        })

        let newCart = false

        if(newUserData.cart) {
            const cartProductsIdArray = newUserData.cart.map(p => p.id)
            const orderItemsArrayData = newUserData.cart.map(p => {
                return {
                    ProductId: p.id,
                    CartId: firstUserOrder.id,
                    quantity: p.quantity,
                    subtotal: ((p.quantity * p.price).toFixed(2)),
                    createdAt: new Date(),
                    updatedAt: new Date() 
                }
            })
            await models.CartItem.bulkCreate(orderItemsArrayData);
            const newCartData = await models.Product.findAll({ 
                where: {id: cartProductsIdArray},
                include: [{
                    model: models.Cart,
                    where: { id: firstUserOrder.id }
                  },
                  {
                    model: models.Image,
                  }],
              })
            newCart = newCartData.map(p => {
                return {
                    id: p.id,
                    name: p.name,
                    description: p.description,
                    price: p.price,
                    stock: p.stock,
                    Images: p.Images,
                    quantity: p.Carts[0].CartItem.quantity,
                }
            })
            const newTotal = newCart.map(p => p.price * p.quantity).reduce((acc, v) => acc + v)
            firstUserOrder.total = newTotal
            await firstUserOrder.save()
        }

        const jasonWebToken = jwt.sign({id: newUser.id, email: newUser.email}, SECRET_KEY_JWT);

        //send email confirmation

        const {
            email,
            name,
            lastName,
        } = newUser;

        transporter.sendMail({
            from: `Onion Food Sup. <${GOOGLE_MAIL}>`,
            to: email,
            subject: 'Welcome to Onion Food Sup.',
            html: mailSignUp(name, lastName, email),
            auth: authMailing,
        });


        response.success(req, res, {message: `User was successfully created. Check your email`, token: jasonWebToken, cart: newCart})

    } catch (error) {
        console.log(error)
        response.error(req, res, error)
    }
})


module.exports = signUpRouter