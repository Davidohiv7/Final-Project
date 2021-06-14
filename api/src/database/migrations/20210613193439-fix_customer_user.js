'use strict';

const replaceEnum = require('sequelize-replace-enum-postgres').default;

module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.removeColumn('customer', "password")

    await replaceEnum({
      queryInterface,
      tableName: 'user',
      columnName: 'role',
      newValues: ['admin', 'staff', 'customer'],
      enumName: 'enum_user_role'
    });

    await queryInterface.changeColumn('user', 'password', {
      type: Sequelize.STRING,
      allowNull: true
    })
  },

  down: async (queryInterface, Sequelize) => {
    await queryInterface.addColumn('customer', "password", {
      type: Sequelize.STRING,
      allowNull: false
    })
    
    await replaceEnum({
      queryInterface,
      tableName: 'user',
      columnName: 'role',
      newValues: ['admin', 'staff'],
      enumName: 'enum_user_role'
    });

    await queryInterface.changeColumn('user', 'password', {
      type: Sequelize.STRING,
      allowNull: false
    })
    
  }
};
