module.exports = (sequelize, DataTypes) => {
  const Order = sequelize.define('Order', {
    id: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true,
      allowNull: false
    },
    customerId: {
      type: DataTypes.INTEGER,
      references: {
        model: 'customer',
        key: 'id'
      },
      allowNull: false
    },
    status: {
      type: DataTypes.ENUM("created", "in_process", "cancelled", "completed"),
      allowNull: false
    },
    createdAt: {
      type: DataTypes.DATE,
      allowNull: false
    },
    updatedAt: {
      type: DataTypes.DATE,
      allowNull: false
    },
    total: {
      type: DataTypes.FLOAT(10, 2)
    }
  }, { tableName: 'order' })

  Order.associate = function(models) {

    Order.belongsTo(models.Customer, {
      foreignKey: 'customerId'
    })

    Order.belongsToMany(models.Product, { through: 'OrderItem' })    
  }

  return Order;
}