const { Sequelize } = require('sequelize');

// Fetch database credentials from Azure application settings or local.settings.json
const sequelize = new Sequelize(
  process.env.DB_NAME,
  process.env.DB_USER,
  process.env.DB_PASSWORD,
  {
    host: process.env.DB_HOST,
    dialect: process.env.DB_DIALECT || 'mysql',
    logging: false, // Turn on console.log if you need to debug queries
    pool: {
      max: 5,
      min: 0,
      acquire: 30000,
      idle: 10000
    },
    dialectOptions: {
      encrypt: true // Highly recommended / often required for Azure SQL/DB connections
    }
  }
);

module.exports = sequelize;