module.exports = (sequelize, DataTypes) => {
  const Customer = sequelize.define('Customer', {
    id: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true,
      allowNull: false
    },
    name: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    lastName: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    email: {
      type: DataTypes.STRING,
      allowNull: false,
      unique: true
    },
    createdAt: {
      type: DataTypes.DATE,
      allowNull: false
    },
    updatedAt: {
      type: DataTypes.DATE,
      allowNull: false
    }
  }, { tableName: 'customer' })

  Customer.associate = function(models) {
    
    Customer.hasMany(models.Order, {
      foreignKey: 'customerId',
      onDelete: 'CASCADE'
    })

    Customer.hasMany(models.ShippingAddress, {
      foreignKey: 'customerId',
      onDelete: 'CASCADE'
    })
    
    Customer.hasMany(models.Review, {
      foreignKey: 'customerId',
      onDelete: 'CASCADE'
    })
  }

  return Customer;
}