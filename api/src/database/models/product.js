module.exports = (sequelize, DataTypes) => {
  const Product = sequelize.define('Product', {
    id: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true,
      allowNull: false
    },
    name: {
      type: DataTypes.STRING,
      allowNull: false
    },
    description: {
      type: DataTypes.TEXT,
      allowNull: true
    },
    price: {
      type: DataTypes.FLOAT(8, 2),
      allowNull: false
    },
    stock: {
      type: DataTypes.INTEGER,
      allowNull: false
    },
    score: {
      type: DataTypes.FLOAT(2, 1),
      allowNull: true
    },
    createdAt: {
      type: DataTypes.DATE,
      allowNull: false
    },
    updatedAt: {
      type: DataTypes.DATE,
      allowNull: false
    }
  }, { tableName: 'product' })

  Product.associate = function(models) {
    Product.hasMany(models.Image, {
      foreignKey: 'productId',
      onDelete: 'CASCADE'
    })

    Product.belongsToMany(models.Category, {
      through: 'ProductCategory'
    })

    Product.hasMany(models.Review, {
      foreignKey: 'productId',
      onDelete: 'CASCADE'
    })

    Product.belongsToMany(models.Order, {
      through: 'OrderItem'
    })
  }

  return Product;
}