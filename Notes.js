const { Sequelize, DataTypes } = require('sequelize');

const db = require('./Database');

const Notes = db.define('Notes', {


    id: {

        type: DataTypes.INTEGER,
        autoIncrement: true,
        allowNull: false,
        primaryKey: true

    },
    notes: {
        type: DataTypes.STRING,
        allowNull: false
    },

    iscomplete: {
      type:  DataTypes.BOOLEAN,
        allowNull: false,
        defaultValue: false
}






});


module.exports = Notes;