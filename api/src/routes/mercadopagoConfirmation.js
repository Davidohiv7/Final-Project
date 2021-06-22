const { Router } = require('express');
const router = Router();
const models = require('../database/models/');

router.put('/', async (req, res) => {
    const { user } = req.query;

    const id = await models.User.findOne({
        where: { 
            name: user.split(' ')[0],
            lastName: user.split(' ')[1]
         },
         include: [{
            model: models.Order,
            where: { status: 'created' }
         }]
    })
    .then(response => response.order.id);

    models.Order.update(
        {status: 'paid'},
        {where: { id: id }}
    )

})

module.exports = router;