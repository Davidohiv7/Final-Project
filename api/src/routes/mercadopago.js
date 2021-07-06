const { Router } = require('express');
const router = Router();
// SDK de Mercado Pago
const mercadopago = require ('mercadopago');
// Agrega credenciales
const {PROD_MP_ACCESS_TOKEN } = process.env;

mercadopago.configure({
     access_token: PROD_MP_ACCESS_TOKEN
    });

router.post("/", (req, res) => {
    const { params } = req.body;
  
  let preference = {
    items: params.map( product => {
      return {
                title: product.name,
                unit_price: (product.price * 1),
                quantity: (product.quantity * 1),
      }
    }),
    back_urls: {
      "success": `${FRONT_URL}/cart`,
      "failure": `${FRONT_URL}/`,
      "pending": `${FRONT_URL}/`
    },
    auto_return: 'approved',
  };
  
  mercadopago.preferences.create(preference)
    .then(function (response) {
      res.json(response)
    }).catch(function (error) {
      console.log(error);
    });
  });

module.exports = router;
