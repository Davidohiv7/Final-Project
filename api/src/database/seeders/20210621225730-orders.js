'use strict';

const bcrypt = require('bcrypt');
const { SALT_ROUNDS } = process.env

const saltRounds = Number(SALT_ROUNDS)


module.exports = {
  up: async (queryInterface, Sequelize) => {

    const globalPassword = "12345";
    const hashedPassword = bcrypt.hashSync(globalPassword, saltRounds);

    const personList = [

      {
        name: "Admin",
        lastName: "Onion",
        email: "onionfoodsuphenry@gmail.com",
        password: hashedPassword,
        role: "admin",
        createdAt: new Date(),
        updatedAt: new Date()
      },

      {
        name: "Theo",
        lastName: "Radicella",
        email: "theoradicella@gmail.com",
        password: hashedPassword,
        role: "customer",
        createdAt: new Date(),
        updatedAt: new Date()
      },
  
      {
        name: "Federico",
        lastName: "Rosales",
        email: "fedocho.96@gmail.com",
        password: hashedPassword,
        role: "customer",
        createdAt: new Date(),
        updatedAt: new Date()
      },
  
      {
        name: "Antonio",
        lastName: "Montero",
        email: "antonio.montero@gmail.com",
        password: hashedPassword,
        role: "customer",
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        name: "Tony",
        lastName: "Stark",
        email: "ironman@gmail.com",
        password: hashedPassword,
        role: "admin",
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        name: "Anthony",
        lastName: "Bourdain",
        email: "tony.bourdain@gmail.com",
        password: hashedPassword,
        role: "admin",
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        name: "Gordon",
        lastName: "Ramsey",
        email: "gordon@gmail.com",
        password: hashedPassword,
        role: "staff",
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        name: "Taylor",
        lastName: "Swift",
        email: "taylor@gmail.com",
        password: hashedPassword,
        role: "staff",
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        name: "Elon",
        lastName: "Musk",
        email: "musk@gmail.com",
        password: hashedPassword,
        role: "customer",
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        name: "Rick",
        lastName: "Sanchez",
        email: "rick.sanchezo@gmail.com",
        password: hashedPassword,
        role: "customer",
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        name: "Bill",
        lastName: "Gates",
        email: "bill.gates@gmail.com",
        password: hashedPassword,
        role: "customer",
        createdAt: new Date(),
        updatedAt: new Date()
      }
    ]


    const customers = await queryInterface.bulkInsert('person', personList, { returning: ['id'] });

    const cart01 = {
      personId: customers[0].id,
      status: "completed",
      paymentMethod: "Stripe",
      total: 999,
      createdAt: new Date(),
      updatedAt: new Date() 
    }

    const cart02 = {
      personId: customers[0].id,
      status: "completed",
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
      status: "completed",
      paymentMethod: "none",
      total: 10000,
      createdAt: new Date(),
      updatedAt: new Date() 
    }

    await queryInterface.bulkInsert('cart', [cart01, cart02, cart03, cart04]) ;
    
  },

  down: async (queryInterface, Sequelize) => {
    await queryInterface.bulkDelete('cart', null);
    await queryInterface.bulkDelete('person', null)
  }
};
