const { Sequelize, DataTypes } = require('sequelize');

const db = require('./Database');

const Users = db.define('Users', {

    id: {
        type: DataTypes.INTEGER,
        allowNull: false,
        primaryKey: true,
        autoIncrement: true

    }
    ,

    username: {

        type: DataTypes.STRING,
        allowNull: false
    },
    password: {

        type: DataTypes.STRING,
        allowNull: false
    }





});

module.exports = Users;