'use strict';

module.exports = {
  up: async (queryInterface, Sequelize) => {

    const beerList = [
      {
        name: 'Bohemia Dark 6x355ml',
        description: 'Vienna style beer, offers the perfect balance between roasted caramel malts and coffee notes.',
        price: 114.00,
        stock: 50,
        score: 5,
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        name: 'Dos Equis Lager Special 12x355m',
        description: 'Ideal for a friend or family gatherings. A light beer that leaves a smooth, refreshing feeling in your mouth.',
        price: 214.90,
        stock: 100,
        score: 4,
        createdAt: new Date(),
        updatedAt: new Date()
      },
    ];

    const coffeeList = [
      {
        name: 'Dolce Gusto Coffee Pods 16 units',
        description: 'Discover Nescafe Dolce Gusto Cafe au Lait, a balanced combination of intense coffee an and milk in a pod, perfect for serving in large cups.',
        price: 139.00,
        stock: 20,
        score: 5,
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        name: 'Starbucks Caramel Macchiato Pods 12 units',
        description: 'Inspired by the Starbucks Latte Macchiato that everyone loves. Intense and deliciously familiar, you can now make it at home with your Dolce Gusto machine.',
        price: 135.00,
        stock: 40,
        score: 5,
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        name: "Garat Gourmet Regular Ground Coffee 1kg",
        description: "A smooth coffee with delicious smell and light foam, not too intense, perfect for any occasion.",
        price: 210.00,
        stock: 70,
        score: 5,
        createdAt: new Date(),
        updatedAt: new Date()
      },
    ]

    const milkList = [
      {
        name: 'Alpura Selecta Lactose Free Milk 1L',
        description: 'Lactose free milk with a creamy texture and delicious flavor, enriched with A and D vitamins.',
        price: 24.00,
        stock: 140,
        score: 5,
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        name: 'Santa Clara Milk 1L',
        description: "100% cow milk. Classic creamy texture and full flavor.",
        price: 22.50,
        stock: 150,
        score: 5,
        createdAt: new Date(),
        updatedAt: new Date()
      },
    ]

    const cerealList = [
      {
        name: "Kellogg's Corn Flakes Original 500g",
        description: "Kellogg’s Corn Flakes Original is made with 100% natural corn. A convenient, nutritive option for a family breakfast.",
        price: 47.99,
        stock: 200,
        score: 5,
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        name: "Extra Cereal with Almonds 310g",
        description: "A great mix of roasted corn flakes, cranberries and almonds.",
        price: 52.99,
        stock: 200,
        score: 5,
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        name: "Fitness cereal with honey and almonds 390g",
        description: "Jumpstart your day with a rich source of energy and fiber with the help of Fitness Honey and Almonds.",
        price: 46.90,
        stock: 180,
        score: 5,
        createdAt: new Date(),
        updatedAt: new Date()
      },
    ];

    const creamList = [
      {
        name: "Nutella Cocoa and Hazelnut 650g",
        description: "Classic Nutella with hazelnuts and cocoa. All-natural ingredients, perfect pr any desserts.",
        price: 116.00,
        stock: 90,
        score: 5,
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        name: "Mister Natural Peanut Butter 320g",
        description: "Delicous and healthy peanut butter made with premium roasted peanuts and no conservatives.",
        price: 60.00,
        stock: 40,
        score: 5,
        createdAt: new Date(),
        updatedAt: new Date()
      },
    ]


    const categoryList = [ 
      { name: "Beer" }, // 0
      { name: "Mexican Beer" }, // 1
      { name: "Cereal" }, // 2
      { name: "Milk" }, // 3
      { name: "Coffee" }, // 4
      { name: "Coffee Pods" }, // 5
      { name: "Creams" } // 6 
    ];


    try {

      await queryInterface.sequelize.transaction(async (t) => {

        // Insert beer
        const beerIds = await queryInterface.bulkInsert('product', beerList, { returning: ['id'], transaction: t })

        // Insert coffee
        const coffeeIds = await queryInterface.bulkInsert('product', coffeeList, { returning: ['id'], transaction: t })

        // Insert milk
        const milkIds = await queryInterface.bulkInsert('product', milkList, { returning: ['id'], transaction: t })

        // Insert cereal
        const cerealIds = await queryInterface.bulkInsert('product', cerealList, { returning: ['id'], transaction: t })

        // Insert cream
        const creamIds = await queryInterface.bulkInsert('product', creamList, { returning: ['id'], transaction: t })

        // Insert categories
        const categoryIds = await queryInterface.bulkInsert('category', categoryList, { returning: ['id'], transaction: t })
        
        // Link beer categories
        await queryInterface.bulkInsert('product_category', [
          { ProductId: beerIds[0].id, CategoryId: categoryIds[0].id },
          { ProductId: beerIds[0].id, CategoryId: categoryIds[1].id },
          { ProductId: beerIds[1].id, CategoryId: categoryIds[0].id },
          { ProductId: beerIds[1].id, CategoryId: categoryIds[1].id },
        ], { transaction: t })

        // Link coffee categories
        await queryInterface.bulkInsert('product_category', [
          { ProductId: coffeeIds[0].id, CategoryId: categoryIds[4].id },
          { ProductId: coffeeIds[0].id, CategoryId: categoryIds[5].id },
          { ProductId: coffeeIds[1].id, CategoryId: categoryIds[4].id },
          { ProductId: coffeeIds[1].id, CategoryId: categoryIds[5].id },
          { ProductId: coffeeIds[2].id, CategoryId: categoryIds[4].id },
        ], { transaction: t })

        // Link milk category
        await queryInterface.bulkInsert('product_category', [
          { ProductId: milkIds[0].id, CategoryId: categoryIds[3].id },
          { ProductId: milkIds[1].id, CategoryId: categoryIds[3].id },
        ], { transaction: t })

        // Link cereal category
        await queryInterface.bulkInsert('product_category', [
          { ProductId: cerealIds[0].id, CategoryId: categoryIds[2].id },
          { ProductId: cerealIds[1].id, CategoryId: categoryIds[2].id },
          { ProductId: cerealIds[2].id, CategoryId: categoryIds[2].id },
        ], { transaction: t })

        // Link cream category
        await queryInterface.bulkInsert('product_category', [
          { ProductId: creamIds[0].id, CategoryId: categoryIds[6].id },
          { ProductId: creamIds[1].id, CategoryId: categoryIds[6].id },
        ], { transaction: t })

        const imageList = [
          {
            // Bohemia
            url: "https://imagizer.imageshack.com/img923/7241/qbXMb9.jpg",
            productId: beerIds[0].id
          },
          {
            // Dos Equis
            url: "https://imagizer.imageshack.com/img922/8318/9tKaSI.jpg",
            productId: beerIds[1].id
          },
          {
            // Dolce Gusto 1
            url: "https://imagizer.imageshack.com/img923/7350/QSTBgs.jpg",
            productId: coffeeIds[0].id
          },
          {
            // Dolce Gusto 2
            url: "https://imagizer.imageshack.com/img924/5120/jxEf9L.jpg",
            productId: coffeeIds[0].id
          },
          {
            // Dolce Gusto 3
            url: "https://imagizer.imageshack.com/img922/6816/mORe9V.jpg",
            productId: coffeeIds[0].id
          },
          {
            // Starbucks Caramel Macchiato 1
            url: "https://imagizer.imageshack.com/img922/1911/ZjkOIk.jpg",
            productId: coffeeIds[1].id
          },
          {
            // Starbucks Caramel Macchiato 2
            url: "https://imagizer.imageshack.com/img923/4656/fqIz1F.jpg",
            productId: coffeeIds[1].id
          },
          {
            // Cafe Garat
            url: "https://imagizer.imageshack.com/img924/4561/ySWRoM.jpg",
            productId: coffeeIds[2].id
          },
          {
            // Leche Alpura Selecta
            url: "https://imagizer.imageshack.com/img923/8268/fIGw9A.jpg",
            productId: milkIds[0].id
          },
          {
            // Leche Santa Clara Entera
            url: "https://imagizer.imageshack.com/img922/7326/2GyaQB.jpg",
            productId: milkIds[1].id
          },
          {
            // Corn Flakes
            url: "https://imagizer.imageshack.com/img923/3840/r2eDZk.jpg",
            productId: cerealIds[0].id
          },
          {
            // Cereal Extra
            url: "https://imagizer.imageshack.com/img924/6710/9t3Ird.jpg",
            productId: cerealIds[1].id
          },
          {
            // Cereal Fitness 1
            url: "https://imagizer.imageshack.com/img922/3646/SBejYr.jpg",
            productId: cerealIds[2].id
          },
          {
            // Cereal Fitness 2
            url: "https://imagizer.imageshack.com/img923/6060/NOgiWf.jpg",
            productId: cerealIds[2].id
          },
          {
            // Nutella 1
            url: "https://imagizer.imageshack.com/img923/3223/0xwqKm.jpg",
            productId: creamIds[0].id
          },
          {
            // Nutella 2
            url: "https://imagizer.imageshack.com/img923/3173/052hrI.jpg",
            productId: creamIds[0].id
          },
          {
            // Crema Mister Natural
            url: "https://imagizer.imageshack.com/img923/4807/IStYJg.jpg",
            productId: creamIds[1].id
          },
        ]
  
        // Insert Images
        await queryInterface.bulkInsert('image', imageList, { transaction: t })
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
    await queryInterface.bulkDelete('image', null)
    await queryInterface.bulkDelete('product', null)
    /**
     * Add commands to revert seed here.
     *
     * Example:
     * await queryInterface.bulkDelete('People', null, {});
     */
  }
};
