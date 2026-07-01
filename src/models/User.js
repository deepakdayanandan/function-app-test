module.exports = (sequelize, DataTypes) => {
  const User = sequelize.define('User', {
    name: DataTypes.STRING,
    email: DataTypes.STRING
  }, { tableName: 'Users', timestamps: false });

  User.associate = (models) => {
    User.hasMany(models.Order, { foreignKey: 'user_id' });
  };

  return User;
};