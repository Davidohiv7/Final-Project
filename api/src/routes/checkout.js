const express = require('express')
const response = require('../utils/response')
const passport = require('passport')
const models = require('../database/models/');

const router = express.Router();


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

        response.success(req, res, { body: data })

    } catch (error) {
        console.log(error)
        response.error(req, res, error)
    }
})


module.exports = router



