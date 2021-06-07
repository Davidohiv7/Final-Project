'use strict';

module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.createTable('product', {
      id: {
        type: Sequelize.INTEGER,
        primaryKey: true,
        autoIncrement: true,
        allowNull: false
      },
      name: {
        type: Sequelize.STRING,
        allowNull: false
      },
      description: {
        type: Sequelize.TEXT,
        allowNull: true
      },
      price: {
        type: Sequelize.FLOAT(8, 2),
        allowNull: false
      },
      stock: {
        type: Sequelize.INTEGER,
        allowNull: false
      },
      score: {
        type: Sequelize.FLOAT(2, 1),
        allowNull: true
      },
      createdAt: {
        type: Sequelize.DATE,
        allowNull: false
      },
      updatedAt: {
        type: Sequelize.DATE,
        allowNull: false
      },
    })

    await queryInterface.createTable('image', {
      id: {
        type: Sequelize.INTEGER,
        primaryKey: true,
        autoIncrement: true,
        allowNull: false
      },
      url: {
        type: Sequelize.STRING,
        allowNull: false
      },
      productId: {
        type: Sequelize.INTEGER,
        references: {
          model: 'product',
          key: 'id'
        }
      },
      createdAt: {
        type: Sequelize.DATE,
        allowNull: true
      },
      updatedAt: {
        type: Sequelize.DATE,
        allowNull: true
      },
    })

    await queryInterface.createTable('category', {
      id: {
        type: Sequelize.INTEGER,
        primaryKey: true,
        autoIncrement: true,
        allowNull: false
      },
      name: {
        type: Sequelize.STRING,
        allowNull: false,
        unique: true
      },
      createdAt: {
        type: Sequelize.DATE,
        allowNull: true
      },
      updatedAt: {
        type: Sequelize.DATE,
        allowNull: true
      },
    })

    await queryInterface.createTable('product_category', {
      id: {
        type: Sequelize.INTEGER,
        primaryKey: true,
        autoIncrement: true,
        allowNull: false
      },
      ProductId: {
        type: Sequelize.INTEGER,
        references: {
          model: 'product',
          key: 'id'
        }
      },
      CategoryId: {
        type: Sequelize.INTEGER,
        references: {
          model: 'category',
          key: 'id'
        }
      },
      createdAt: {
        type: Sequelize.DATE,
        allowNull: true
      },
      updatedAt: {
        type: Sequelize.DATE,
        allowNull: true
      },
    })
  },

  down: async (queryInterface, Sequelize) => {
    await queryInterface.dropTable('product_category');
    await queryInterface.dropTable('category');
    await queryInterface.dropTable('image');
    await queryInterface.dropTable('product');
  }
};
