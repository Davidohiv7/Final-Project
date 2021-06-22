const express = require('express')
const response = require('../utils/response')
const models = require('../database/models/');

const router = express.Router();

router.get('/', async (req, res) => {
    const { id } = req.body;

    const reviews = await models.Review.findAll({
        where: {productId: id}
    });

    const reviewWithUserNames = await Promise.all(reviews.map(review => {
        models.Person.findOne({
            where: {id: review.personId},
        })
        .then(resp => {review, resp.name})
    }));

    response(req, res, reviewWithUserNames);
    
})



module.exports = router