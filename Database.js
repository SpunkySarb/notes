const { Sequelize } = require('sequelize');

const sequelize = new Sequelize('notes', 'root', '1212', { host: 'localhost', dialect: 'mysql' });

module.exports = sequelize;