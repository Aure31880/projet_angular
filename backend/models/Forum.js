const Sequelize = require('sequelize');
const sequelize = require('../config/database');
// const mysql = require('mysql2');
require('dotenv').config();
const User = require('./User');

const Forum = sequelize.define("forum", {

    id: {
        type: Sequelize.UUID,
        defaultValue: Sequelize.UUIDV4,
        primaryKey: true,
        allowNull: false
    },
    idUser: {
        type: Sequelize.UUID,
        allowNull: false
    },
    comment: {
        type: Sequelize.TEXT,
        allowNull: true
    },
    imageUrl: {
        type: Sequelize.STRING,
        allowNull: true
    },
});

Forum.sync({
    alter: true
});

module.exports.Forum = Forum;
