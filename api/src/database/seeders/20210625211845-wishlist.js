'use strict';

const models = require('../models');
const { Op } = require("sequelize");

module.exports = {
  up: async (queryInterface, Sequelize) => {
    const admin = await models.Person.findOne({ where: { email: "onionfoodsuphenry@gmail.com" } });
    const elon = await models.Person.findOne({ where: { email: "musk@gmail.com" } });

    const products = await models.Product.findAll({
      where: {
        name: { [Op.iLike]: `%coffee%` }, 
      },
    })
    //console.log("////////// PRODUCTS: ", products)
    //await admin.setProducts(products);
    //await elon.setProducts(products);
    await queryInterface.bulkInsert('wishlist_item', [
      { ProductId: products[0].id, PersonId: elon.id, createdAt: new Date(), updatedAt: new Date() },
      { ProductId: products[0].id, PersonId: elon.id, createdAt: new Date(), updatedAt: new Date() },
      { ProductId: products[1].id, PersonId: admin.id, createdAt: new Date(), updatedAt: new Date() },
      { ProductId: products[1].id, PersonId: admin.id, createdAt: new Date(), updatedAt: new Date() },
    ]);
  
  },

  down: async (queryInterface, Sequelize) => {
    await queryInterface.bulkDelete('wishlist_item', null);
    
  }
};
