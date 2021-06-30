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
      PersonId: person.id,
      ProductId: product.id
    })
    .then(items => {
        models.Product.findOne({
            where: { id: product.id },
            include: [{
                model: models.Image,
              }]
        })
        .then(resp => {
            response.success(req, res, resp, 200)
        })
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
  
  });

  router.delete("/", (req, res) => {
    const { id, userEmail } = req.query; 
    
    models.Person.findOne({
      where: {email: userEmail}
    })
    .then(person => {
      models.wishlist_item.destroy({
        where: {PersonId: person.id, ProductId: id}
      })
    })
    .then(resp => {
      response.success(req, res, id, 200)
    })
  });

module.exports = router;