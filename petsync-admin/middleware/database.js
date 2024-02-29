// config/database.js
const { Sequelize } = require('sequelize');

const sequelize = new Sequelize('petcommunity', 'root', '', {
  host: 'localhost',
  dialect: 'mysql'
});

module.exports = sequelize;