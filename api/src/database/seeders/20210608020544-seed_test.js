'use strict';

module.exports = {
  up: async (queryInterface, Sequelize) => {

    const beerList = [
      {
        name: 'Cerveza Bohemia Obscura Botella 6x355ml',
        description: 'Es una cerveza estilo viena, ofrece el perfecto balance entre maltas caramelo y tostadas que desprenden notas de nuez y café.',
        price: 114.00,
        stock: 50,
        score: 5,
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        name: 'Cerveza Dos Equis Lager Especial Botella 12x355m',
        description: 'Cerveza Dos Equis lager especial. Ideal para una tarde de amigos o reunión familiar. Es una cerveza clara que dejará un toque suave y refrescante en tu paladar.',
        price: 214.90,
        stock: 100,
        score: 5,
        createdAt: new Date(),
        updatedAt: new Date()
      },
    ];

    const coffeeList = [
      {
        name: 'Cápsulas de Café Dolce Gusto Café con Leche 16 pzas',
        description: 'Descubra NESCAFÉ® Dolce Gusto® Café au Lait, una combinación equilibrada de café intenso y leche en una cápsula, ideal para servir en una taza grande (180 ml).',
        price: 139.00,
        stock: 20,
        score: 5,
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        name: 'Cápsulas de Café Starbucks Caramel Macchiato 12 pzas',
        description: 'Inspirado en el Latte Macchiato de Starbucks que tanto te gusta: aterciopelado, intenso y deliciosamente familiar, hecho en casa con tu máquina Nescafé Dolce Gusto',
        price: 135.00,
        stock: 40,
        score: 5,
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        name: "Café Tostado y Molido Garat Gourmet Regular 1kg",
        description: "Un café suave de molido medio, con delicioso aroma, una ligera espuma y de sabor de mediana intensidad que lo hace muy versátil para preparar cualquier bebida.",
        price: 210.00,
        stock: 70,
        score: 5,
        createdAt: new Date(),
        updatedAt: new Date()
      },
    ]

    const milkList = [
      {
        name: 'Leche Alpura Selecta Deslactosada 1L',
        description: 'Para mejorar tu digestión, además de probar un sabor delicioso, toma leche selecta, de Alpura. Esta bebida está deslactosada y posee una consistencia cremosa, además de estar ultrapasteurizada y adicionada con vitaminas A y D.',
        price: 24.00,
        stock: 140,
        score: 5,
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        name: 'Leche Santa Clara Entera 1L',
        description: "Leche 100% pura de vaca y tenemos un proceso de ultra pasteurización a base de vapor, único en el mercado que mantiene las propiedades naturales de la leche, además de darle esa cremosidad y sabor que nos vuelve extraordinarios.",
        price: 22.50,
        stock: 150,
        score: 5,
        createdAt: new Date(),
        updatedAt: new Date()
      },
    ]

    const cerealList = [
      {
        name: "Cereal Kellogg's Corn Flakes Original 500g",
        description: "Corn Flakes® de Kellogg’s® es un cereal hecho con granos de maíz de origen 100% natural, lo que lo hace una opción rica y nutritiva para el desayuno de tu familia.",
        price: 47.99,
        stock: 200,
        score: 5,
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        name: "Cereal Extra Arándano con Almendras 310g",
        description: "Combinación de hojuelas de maíz con sabor a cacahuate mezcladas con arándanos y almendras",
        price: 52.99,
        stock: 200,
        score: 5,
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        name: "Cereal Multigrano Fitness Miel y Almendras 390g",
        description: "Inicia tus días con una rica fuente de energía y fibra con el cereal Fitness Miel y Alemendras de Nestlé, que tiene almendras y un toque de miel que seguro te encantará y que aportará a tu vida los nutrientes que necesitas para iniciar tus días",
        price: 46.90,
        stock: 180,
        score: 5,
        createdAt: new Date(),
        updatedAt: new Date()
      },
    ];

    const creamList = [
      {
        name: "Crema de Avellana y Cacao Nutella 650g",
        description: "Crema de avellana y cacao de 650 g. Untable e ideal para postres.Hecha con ingredientes naturales. No contiene colorantes ni conservadores artificiales.",
        price: 116.00,
        stock: 90,
        score: 5,
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        name: "Crema de Cacahuate Mister Natural 320g",
        description: "Deliciosa y saludable crema de cacahuate hecha con cacahuate tostado premium, sin conservadores. ",
        price: 60.00,
        stock: 40,
        score: 5,
        createdAt: new Date(),
        updatedAt: new Date()
      },
    ]


    const categoryList = [ 
      { name: "Cerveza" }, // 0
      { name: "Cerveza Nacional" }, // 1
      { name: "Cereal" }, // 2
      { name: "Leche" }, // 3
      { name: "Café" }, // 4
      { name: "Cápsulas de Café" }, // 5
      { name: "Cremas" } // 6 
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
