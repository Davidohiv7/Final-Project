module.exports = (sequelize, DataTypes) => {
  const OrderItem = sequelize.define('OrderItem', {
    id: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true,
      allowNull: false
    },
    ProductId: {
      type: DataTypes.INTEGER,
      references: {
        model: 'product',
        key: 'id'
      },
      allowNull: false
    },
    OrderId: {
      type: DataTypes.INTEGER,
      references: {
        model: 'order',
        key: 'id'
      },
      allowNull: false
    },
    quantity: {
      type: DataTypes.INTEGER,
      allowNull: false
    },
    subtotal: {
      type: DataTypes.FLOAT(10, 2)
    },
    createdAt: {
      type: DataTypes.DATE,
    },
    updatedAt: {
      type: DataTypes.DATE,
    }
  }, { tableName: 'order_item'})

  return OrderItem;
}