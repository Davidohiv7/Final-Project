const express = require('express')
const response = require('../utils/response')
const passport = require('passport')
const models = require('../database/models/');

const router = express.Router();


router.post('/add', passport.authenticate('jwt', {session: false}), async (req, res, next) => {
    const user = req.user
    const {orderId, productId, review} = req.body

    try {
        const validateReview = await models.Review.findOne({ 
            where: { 
                productId: productId,
                personId: user.id
            } 
        })

        if(validateReview) {
            return response.success(req, res, {review: validateReview, isNew: false} )
        }

        const newReview = await models.Review.create({
            productId: productId,
            personId: user.id,
            description: review.description,
            score: review.score,
            createdAt: new Date(),
            updatedAt: new Date(),
        })

        response.success(req, res, {review: newReview, isNew: true} )

    } catch (error) {
        console.log(error)
        response.error(req, res, error)
    }
})

module.exports = router