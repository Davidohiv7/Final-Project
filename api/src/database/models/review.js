module.exports = (sequelize, DataTypes) => {
  const Review = sequelize.define('Review', {
    id: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true,
      allowNull: false
    },
    productId: {
      type: DataTypes.INTEGER,
      references: {
        model: 'product',
        key: 'id'
      },
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
    description: {
      type: DataTypes.TEXT,
    },
    score: {
      type: DataTypes.DECIMAL(2, 1)
    },
    createdAt: {
      type: DataTypes.DATE,
      allowNull: false
    },
    updatedAt: {
      type: DataTypes.DATE,
    }
  }, { tableName: 'review' })

  Review.associate = function(models) {

    Review.belongsTo(models.Product, {
      foreignKey: 'productId',
    })

    // Review.belongsTo(models.Customer, {
    //   foreignKey: 'customerId',
    // })

    Review.belongsTo(models.User, {
      foreignKey: 'userId',
    })
  }

  return Review;
}