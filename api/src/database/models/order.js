module.exports = (sequelize, DataTypes) => {
  const Cart = sequelize.define('Cart', {
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
    personId: {
      type: DataTypes.INTEGER,
      references: {
        model: 'person',
        key: 'id'
      },
      allowNull: false
    },
    // status: {
    //   type: DataTypes.ENUM("created", "in_process", "cancelled", "completed"),
    //   allowNull: false
    // },
    status: {
      type: DataTypes.STRING,
      allowNull: false
    },
    createdAt: {
      type: DataTypes.DATE,
      allowNull: true
    },
    updatedAt: {
      type: DataTypes.DATE,
      allowNull: true
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
  }, { tableName: 'cart', timestamps: true })

  Cart.associate = function(models) {

    Cart.belongsTo(models.Person, {
      foreignKey: 'personId',
      onDelete: 'CASCADE',
      onUpdate: 'CASCADE'
    })

    Cart.belongsToMany(models.Product, { through: 'CartItem' })    
  }

  return Cart;
}