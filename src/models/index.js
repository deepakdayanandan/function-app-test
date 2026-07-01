const { Sequelize, DataTypes } = require('sequelize');
const sequelize = require('../config/database');

const db = {};

// Import models explicitly
db.User = require('./User')(sequelize, DataTypes);
db.Order = require('./Order')(sequelize, DataTypes);
db.Product = require('./Product')(sequelize, DataTypes);

// Execute associations
Object.keys(db).forEach((modelName) => {
  if (db[modelName].associate) {
    db[modelName].associate(db);
  }
});

db.sequelize = sequelize;
db.Sequelize = Sequelize;

module.exports = db;