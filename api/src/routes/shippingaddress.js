const express = require('express')
const response = require('../utils/response')
const passport = require('passport')
const models = require('../database/models/');

const router = express.Router();

router.get('/', passport.authenticate('jwt', {session: false}), async (req, res, next) => {
    const user = req.user

    try {

        const userAddresses = await models.ShippingAddress.findAll({
            where: {
                personId: user.id,
            },
        })

        response.success(req, res, { userAddresses } )

    } catch (error) {
        response.error(req, res, error)
    }
})

router.post('/add', passport.authenticate('jwt', {session: false}), async (req, res, next) => {
    const user = req.user
    const { street, neighborhood, city, zip } = req.body

    try {
        newAddress = await models.ShippingAddress.create({
            street, 
            neighborhood, 
            city, 
            zip,
            personId: user.id,
            createdAt: new Date(),
            updatedAt: new Date(),
        });
    
        const userAddresses = await models.ShippingAddress.findAll({
            where: {
                personId: user.id,
            },
        })

        response.success(req, res, { userAddresses } )

    } catch (error) {
        console.log(error)
        response.error(req, res, error)
    }
})

router.put('/delete', passport.authenticate('jwt', {session: false}), async (req, res, next) => {
    const user = req.user
    const { address } = req.body

    try {
        await models.ShippingAddress.destroy({
            where: {
                personId: user.id,
                id: address.id,
            },
        })

        const userAddresses = await models.ShippingAddress.findAll({
            where: {
                personId: user.id,
            },
        })

        response.success(req, res, { userAddresses } )

    } catch (error) {
        console.log(error)
        response.error(req, res, error)
    }
})

module.exports = router