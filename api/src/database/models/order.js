module.exports = (sequelize, DataTypes) => {
  const Order = sequelize.define('Order', {
    id: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true,
      allowNull: false
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
    // status: {
    //   type: DataTypes.ENUM("created", "in_process", "cancelled", "completed"),
    //   allowNull: false
    // },
    status: {
      type: DataTypes.ENUM('created', 'paid', 'progress', 'cancelled', 'completed'),
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
      type: DataTypes.DECIMAL(10, 2)
    },
    city: {
      type: DataTypes.STRING,
      allowNull: true
    },
    zip: {
      type: DataTypes.STRING,
      allowNull: true
    },
    street: {
      type: DataTypes.STRING,
      allowNull: true
    },
    neighborhood: {
      type: DataTypes.STRING,
      allowNull: true
    },
    paymentMethod: {
      type: DataTypes.STRING,
      allowNull: true
    },
  }, { tableName: 'order' })

  Order.associate = function(models) {

    Order.belongsTo(models.User, {
      foreignKey: 'userId'
    })

    Order.belongsToMany(models.Product, { through: 'OrderItem' })    
  }

  return Order;
}