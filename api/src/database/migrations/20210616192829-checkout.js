'use strict';

const replaceEnum = require('sequelize-replace-enum-postgres').default;

module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.removeColumn('order', 'customerId');
    await queryInterface.addColumn('order', 'userId', {
      type: Sequelize.INTEGER,
      references: { model: 'user', key: 'id' }
    });
    await replaceEnum({
      queryInterface,
      tableName: 'order',
      columnName: 'status',
      newValues: ['created', 'paid', 'progress', 'cancelled', 'completed'],
      enumName: 'enum_order_status'
    });
    await queryInterface.addColumn('order', 'city', {
      type: Sequelize.STRING,
        allowNull: true
    });
    await queryInterface.addColumn('order', 'zip', {
      type: Sequelize.STRING,
        allowNull: true
    });
    await queryInterface.addColumn('order', 'street', {
      type: Sequelize.STRING,
        allowNull: true
    });
    await queryInterface.addColumn('order', 'neighborhood', {
      type: Sequelize.STRING,
        allowNull: true
    });
    await queryInterface.addColumn('order', 'paymentMethod', {
      type: Sequelize.STRING,
        allowNull: true
    });
    

    await queryInterface.removeColumn('review', 'customerId');
    await queryInterface.addColumn('review', 'userId', {
      type: Sequelize.INTEGER,
      references: { model: 'user', key: 'id' }
    });

    await queryInterface.removeColumn('shipping_address', 'customerId');
    await queryInterface.addColumn('shipping_address', 'userId', {
      type: Sequelize.INTEGER,
      references: { model: 'user', key: 'id' }
    });

    await queryInterface.dropTable('customer');
  },

  down: async (queryInterface, Sequelize) => {
    await queryInterface.createTable('customer', {
      id: {
        type: Sequelize.INTEGER,
        primaryKey: true,
        autoIncrement: true,
        allowNull: false
      },
      name: {
        type: Sequelize.STRING,
        allowNull: false,
      },
      lastName: {
        type: Sequelize.STRING,
        allowNull: false,
      },
      email: {
        type: Sequelize.STRING,
        allowNull: false,
        unique: true
      },
      createdAt: {
        type: Sequelize.DATE,
        allowNull: false
      },
      updatedAt: {
        type: Sequelize.DATE,
        allowNull: false
      },
    });

    await queryInterface.addColumn('shipping_address', 'customerId', {
      type: Sequelize.INTEGER,
      references: { model: 'customer', key: 'id' }
    });
    await queryInterface.removeColumn('shipping_address', 'userId');

    await queryInterface.addColumn('review', 'customerId', {
      type: Sequelize.INTEGER,
      references: { model: 'customer', key: 'id' }
    });
    await queryInterface.removeColumn('review', 'userId');

    await replaceEnum({
      queryInterface,
      tableName: 'order',
      columnName: 'status',
      newValues: ["created", "in_process", "cancelled", "completed"],
      enumName: 'enum_order_status'
    });
    await queryInterface.addColumn('order', 'customerId', {
      type: Sequelize.INTEGER,
      references: { model: 'customer', key: 'id' }
    });
    await queryInterface.removeColumn('order', 'userId');
    await queryInterface.removeColumn('order', 'city');
    await queryInterface.removeColumn('order', 'zip');
    await queryInterface.removeColumn('order', 'street');
    await queryInterface.removeColumn('order', 'neighborhood');
    await queryInterface.removeColumn('order', 'paymentMethod');

  }
};
