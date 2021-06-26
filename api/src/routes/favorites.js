const { Router } = require('express');
const router = Router();
const models = require('../database/models/');
const response = require('../utils/response');


router.post("/", (req, res) => {
  const { product, userEmail } = req.body.params; 
  
  models.Person.findOne({
      where: {email: userEmail}
  })
  .then(person => {
      models.wishlist_item.create({
        ProductId: product.id,
        PersonId: person.id,
      })
  })

});

router.get("/", (req, res) => {
    const { userEmail } = req.query; 
    
    models.Person.findOne({
        where: {email: userEmail}
    })
    .then(person => {
        models.wishlist_item.findAll({
          where: { PersonId: person.id },
        })
        .then(items => {
            let idArray = items.map(item => item.ProductId);

            models.Product.findAll({
                where: { id: idArray },
                include: [{
                    model: models.Image,
                  }]
            })
            .then(resp => {
                response.success(req, res, resp, 200)
            })
        })
    })
  
  })

module.exports = router;