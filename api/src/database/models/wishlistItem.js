module.exports = (sequelize, DataTypes) => {
  const WishlistItem = sequelize.define('wishlist_item', {
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
      },
      unique: 'wishlist_item_unique_constraint'
    },
    ProductId: {
      type: DataTypes.INTEGER,
      references: {
        model: 'product',
        key: 'id'
      },
      unique: 'wishlist_item_unique_constraint'
    },
    createdAt: {
      type: DataTypes.DATE,
      allowNull: true
    },
    updatedAt: {
      type: DataTypes.DATE,
      allowNull: true
    }
  }, { tablename: 'wishlist_item', timestamps: true, freezeTableName: true })

  return WishlistItem;
}