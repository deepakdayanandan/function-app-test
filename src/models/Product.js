module.exports = (sequelize, DataTypes) => {
  const Product = sequelize.define('Product', {
    name: DataTypes.STRING,
    price: DataTypes.DECIMAL
  }, { tableName: 'Products', timestamps: false });

  Product.associate = (models) => {
    Product.belongsToMany(models.Order, { 
      through: 'Order_Items', 
      foreignKey: 'product_id', 
      otherKey: 'order_id' 
    });
  };

  return Product;
};