module.exports = (sequelize, DataTypes) => {
  const WishlistItem = sequelize.define('WishlistItem', {
    id: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true,
    },
    PersonId: {
      type: DataTypes.INTEGER,
      references: {
        model: 'person',
        key: 'id'
      }
    },
    ProductId: {
      type: DataTypes.INTEGER,
      references: {
        model: 'product',
        key: 'id'
      }
    },
    createdAt: {
      type: DataTypes.DATE,
      allowNull: true
    },
    updatedAt: {
      type: DataTypes.DATE,
      allowNull: true
    }
  }, { tablename: 'wishlist_item', timestamps: true })

  return WishlistItem;
}