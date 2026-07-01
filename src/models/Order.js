module.exports = (sequelize, DataTypes) => {
  const Order = sequelize.define('Order', {
    orderDate: { type: DataTypes.DATE, field: 'order_date' },
    totalAmount: { type: DataTypes.DECIMAL, field: 'total_amount' }
  }, { tableName: 'Orders', timestamps: false });

  Order.associate = (models) => {
    Order.belongsTo(models.User, { foreignKey: 'user_id' });
    // Many-to-Many relationship to Products via Order_Items
    Order.belongsToMany(models.Product, { 
      through: 'Order_Items', 
      foreignKey: 'order_id', 
      otherKey: 'product_id' 
    });
  };

  return Order;
};