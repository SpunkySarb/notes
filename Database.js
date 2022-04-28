const { Sequelize } = require('sequelize');

const sequelize = new Sequelize('heroku_0258f701cf0501f', 'bef8e6336b478a', '32753335', { host: 'us-cdbr-east-05.cleardb.net', dialect: 'mysql' });

module.exports = sequelize;