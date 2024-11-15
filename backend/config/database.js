const { Sequelize } = require('sequelize');

const sequelize = new Sequelize('atv04', 'root', '', {
  host: 'localhost',
  dialect: 'mysql',
});

module.exports = sequelize;