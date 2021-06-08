'use strict';

module.exports = {
  up: async (queryInterface, Sequelize) => {

    const productList = [
      {
        name: 'Corona Six Pack',
        description: 'Classic Mexican Corona beer, six pack 350ml',
        price: 12.99,
        stock: 50,
        score: 5,
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        name: 'Quilmes Six Pack',
        description: 'Classic Argentinian Quilmes beer, six pack 350ml',
        price: 12.99,
        stock: 100,
        score: 5,
        createdAt: new Date(),
        updatedAt: new Date()
      }
    ];

    const categoryList = [ 
      {
        name: "Beer", 
      }, 
      {
        name: "Imported Beer"
      } 
    ];

    try {

      await queryInterface.sequelize.transaction(async (t) => {

        const beerIds = await queryInterface.bulkInsert('product', productList, { returning: ['id'], transaction: t })
        const categoryIds = await queryInterface.bulkInsert('category', categoryList, { returning: ['id'], transaction: t })
    
        await queryInterface.bulkInsert('product_category', [
          { ProductId: beerIds[0].id, CategoryId: categoryIds[0].id },
          { ProductId: beerIds[0].id, CategoryId: categoryIds[1].id },
          { ProductId: beerIds[1].id, CategoryId: categoryIds[0].id },
          { ProductId: beerIds[1].id, CategoryId: categoryIds[1].id }
        ], { transaction: t })
      })

    } catch (error) {
      console.log("//// Something went wrong!", error)
    }


    /**
     * Add seed commands here.
     *
     * Example:
     * await queryInterface.bulkInsert('People', [{
     *   name: 'John Doe',
     *   isBetaMember: false
     * }], {});
    */
  },

  down: async (queryInterface, Sequelize) => {
    await queryInterface.bulkDelete('product_category', null)
    await queryInterface.bulkDelete('category', null)
    await queryInterface.bulkDelete('product', null)
    /**
     * Add commands to revert seed here.
     *
     * Example:
     * await queryInterface.bulkDelete('People', null, {});
     */
  }
};
