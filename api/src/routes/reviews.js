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

        const product = await models.Product.findOne({
            where: { id: productId},
            include: {
              model: models.Review,
              attributes: ['score']
            }
        });

        product.score = Math.round((product.Reviews.reduce((accumulator, review) => accumulator + Number(review.score), 0)) /  (product.Reviews.length))
        await product.save()

        response.success(req, res, {review: newReview, isNew: true} )

    } catch (error) {
        console.log(error)
        response.error(req, res, error)
    }
})

router.get('/getById', async (req, res, next) => {
    const {
        id
    } = req.query;

    const reviews = await models.Review.findAll({
        where: {
            productId: id
        },
        include: [{
                    model: models.Person,
                    required: false,
                    attributes: {
                        exclude: ['password', 'role', 'createdAt', 'updatedAt', 'email']
                    },
                }],
    });

    /*const reviewWithUserNames = await Promise.all(reviews.map(review => {
        models.Person.findOne({
                where: {
                    id: review.personId
                },
            })
            .then(resp => {
                review,
                resp.name
            })

    
    }));*/

    response.success(req, res, reviews);
})

module.exports = router