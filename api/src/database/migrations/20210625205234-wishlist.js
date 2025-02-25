'use strict';

module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.createTable('wishlist_item', {
      id: {
        type: Sequelize.INTEGER,
        primaryKey: true,
        autoIncrement: true,
      },
      PersonId: {
        type: Sequelize.INTEGER,
        references: {
          model: 'person',
          key: 'id'
        },
        onDelete: 'CASCADE',
        onUpdate: 'CASCADE'
      },
      ProductId: {
        type: Sequelize.INTEGER,
        references: {
          model: 'product',
          key: 'id'
        },
        onDelete: 'CASCADE',
        onUpdate: 'CASCADE'
      },
      createdAt: {
        type: Sequelize.DATE,
        allowNull: true
      },
      updatedAt: {
        type: Sequelize.DATE,
        allowNull: true
      }
    })

    await queryInterface.addConstraint('wishlist_item', {
      fields:  ['ProductId', 'PersonId'],
      type: 'unique',
      name: 'wishlist_item_unique_constraint'
    });
    
  },

  down: async (queryInterface, Sequelize) => {
    await queryInterface.dropTable('wishlist_item');
    
  }
};
