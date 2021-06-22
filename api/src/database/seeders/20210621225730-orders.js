'use strict';

module.exports = {
  up: async (queryInterface, Sequelize) => {


    const personList = [

      {
        name: "Theo",
        lastName: "Radicella",
        email: "theoradicella@gmail.com",
        password: "12345",
        role: "customer",
        createdAt: new Date(),
        updatedAt: new Date()
      },
  
      {
        name: "Federico",
        lastName: "Rosales",
        email: "fedocho.96@gmail.com",
        password: "12345",
        role: "customer",
        createdAt: new Date(),
        updatedAt: new Date()
      },
  
      {
        name: "Antonio",
        lastName: "Montero",
        email: "antonio.montero@gmail.com",
        password: "12345",
        role: "customer",
        createdAt: new Date(),
        updatedAt: new Date()
      }
    ]


    const customers = await queryInterface.bulkInsert('person', personList, { returning: ['id'] });
    console.log("///////////// CUSTOMERS", customers);


    const cart01 = {
      personId: customers[0].id,
      status: "paid",
      paymentMethod: "Stripe",
      total: 999,
      createdAt: new Date(),
      updatedAt: new Date() 
    }

    const cart02 = {
      personId: customers[0].id,
      status: "paid",
      paymentMethod: "MercadoPago",
      total: 2000,
      createdAt: new Date(),
      updatedAt: new Date() 
    }

    const cart03 = {
      personId: customers[1].id,
      status: "completed",
      paymentMethod: "Stripe",
      total: 5000,
      createdAt: new Date(),
      updatedAt: new Date() 
    }

    const cart04 = {
      personId: customers[1].id,
      status: "created",
      paymentMethod: "none",
      total: 10000,
      createdAt: new Date(),
      updatedAt: new Date() 
    }

    const carts = await queryInterface.bulkInsert('cart', [cart01, cart02, cart03, cart04]) ;
    
  },

  down: async (queryInterface, Sequelize) => {
    await queryInterface.bulkDelete('cart', null);
    await queryInterface.bulkDelete('person', null)
  }
};
