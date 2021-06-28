const express = require('express')
const response = require('../utils/response')
const passport = require('passport')
const models = require('../database/models/');
const { Op } = require("sequelize");

const router = express.Router();


router.get('/data', passport.authenticate('jwt', {session: false}), async (req, res, next) => {
    const userData = {
        name: req.user.name,
        lastName: req.user.lastName,
        email: req.user.email,
        role: req.user.role
    }

    try {
        let orderValidation = await models.Cart.findOne({
            where: {
                status: ['created', 'paid'],
                personId: req.user.id,
            },
        })
    
    
        let orderItems = false
    
        if(orderValidation) {
            orderItems = await models.CartItem.findAll({
                where: {
                    CartId: orderValidation.id,
                }, 
            })
        }
    
    
        let cart = false 
    
        if(orderItems) {
            const cartProductsIdArray = orderItems.map(p => p.ProductId)
            const cartData = await models.Product.findAll({ 
                where: {id: cartProductsIdArray},
                include: [{
                    model: models.Cart,
                    where: { 
                        id: orderValidation.id 
                        }
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
                    quantity: p.Carts[0].CartItem.quantity,
            }
          })
        }
    
    
        userOrders = await models.Cart.findAll({
            where: {
                personId: req.user.id,
                status: { [Op.not]: ['created', 'paid']},
            },
            attributes:  { exclude: ['createdAt'] },
        })
    
        const orders = userOrders ? userOrders : []
        
        const total = orderValidation ? orderValidation.total : 0.00
    
        const shippingAddress = orderValidation ? {
            city: orderValidation.city,
            zip: orderValidation.zip,
            neighborhood: orderValidation.neighborhood,
            street: orderValidation.street
        } 
        : null
    
        const paymentStatus = orderValidation ? {
            status: orderValidation.status,
            paymentMethod: orderValidation.paymentMethod
        }
        :
        null
        
        response.success(req, res, {userData, cart, total, shippingAddress, paymentStatus, orders }) 
    } catch (error) {
        console.log(error)
        response.error(req, res, {message: 'We couldn`t get user information'}) 
    }
    
})

router.get('/', passport.authenticate('jwt', {session: false}), async (req, res) => {

    try {
        let {role, page = 1, limit = 8 } = req.query;
        
        if (role === "") role = null;

        if(!role) {
            const { count } = await models.Person.findAndCountAll();
        
            if (count === 0) return response.success(req, res, { users: [] }, 200);
    
            let nextPage;
            let previousPage;
            let pages = Math.ceil(count / limit);
            if (page > pages) page = pages;
            const pageNumber = parseInt(page)
            let startIndex = (page - 1) * limit;
            let endIndex = page * limit;
            if (endIndex < count) nextPage = pageNumber + 1;
            if (startIndex > 0) previousPage = pageNumber - 1;
    
    
            const users = await models.Person.findAll({
                limit: limit,
                offset: (page * limit) - limit,
            });
    
            return response.success(req, res, { nextPage, previousPage, count, pages, pageNumber, users }, 200);
        }

        role = role.toLowerCase()
        const { count } = await models.Person.findAndCountAll({
            where: { role: role }
        });
    
        if (count === 0) return response.success(req, res, {users: []}, 200);
    
        const data = {};
        let pages = Math.ceil(count / limit);
        if (page > pages) page = pages;
        const pageNumber = parseInt(page)
        let startIndex = (page - 1) * limit;
        let endIndex = page * limit;
        if (endIndex < count) data.nextPage = pageNumber + 1;
        if (startIndex > 0) data.previousPage = pageNumber - 1;

        const users = await models.Person.findAll({
            where: { role: role },
            limit: limit,
            offset: (page * limit) - limit,
        });

        response.success(req, res, { ...data, count, pages, pageNumber, users }, 200);
        

        
    } catch (error) {
        response.error(req, res, { users: [] }, 500);
    }
})

router.delete('/:id', passport.authenticate('jwt', {session: false}), async (req, res) => {
    const { id } = req.params;

    try {
        const user = await models.Person.findOne({ where: { id: id } });
        if (!user) return response.success(req, res, { message: "User not found." }, 200);

        await user.destroy();
        response.success(req, res, { message: "User deleted successfully." });
    } catch (error) {
        response.error(req, res, error);
    }
})

router.get('/:id', async (req, res) => {
    try {
        const { id } = req.params;
        const user = await models.Person.findOne({ where: { id: id } });
        if (!user) return response.success(req, res, { message: "User not found." }, 200);
        response.success(req, res, user);
    } catch (error) {
        response.error(req, res, error);
    }
})

router.patch('', passport.authenticate('jwt', {session: false}), async (req, res) => {
    try {
        let { id, role } = req.body;
        const user = await models.Person.findOne({
            where: { id: id }
        });
        if (!user) return response.success(req, res, { message: "User not found."}, 200);

        user.role = role.toLowerCase();
        await user.save();
        response.success(req, res, { message: "User updated successfully." });

    } catch (error) {
        response.error(req, res, error);
    }
})

module.exports = router