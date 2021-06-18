module.exports = (sequelize, DataTypes) => {
  const ShippingAddress = sequelize.define('ShippingAddress', {
    id: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true,
      allowNull: false
    },
    city: {
      type: DataTypes.STRING,
      allowNull: false
    },
    zip: {
      type: DataTypes.STRING,
      allowNull: false
    },
    street: {
      type: DataTypes.STRING,
      allowNull: false
    },
    neighborhood: {
      type: DataTypes.STRING,
    },
    // customerId: {
    //   type: DataTypes.INTEGER,
    //   references: {
    //     model: 'customer',
    //     key: 'id'
    //   },
    //   allowNull: false
    // },
    userId: {
      type: DataTypes.INTEGER,
      references: {
        model: 'user',
        key: 'id'
      },
      allowNull: false
    },
    createdAt: {
      type: DataTypes.DATE,
    },
    updatedAt: {
      type: DataTypes.DATE,
    }
  }, { tableName: 'shipping_address'})

  ShippingAddress.associate = function(models) {

    // ShippingAddress.belongsTo(models.Customer, {
    //   foreignKey: 'customerId'
    // })
    ShippingAddress.belongsTo(models.User, {
      foreignKey: 'userId'
    })
  }

  return ShippingAddress;
}