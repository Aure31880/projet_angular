const sequelize = require("../config/database");
const Sequelize = require("sequelize")
// const mysql = require("mysql2");
require('dotenv').config();
const Forum = require('./Forum');

// var Sequelize = require('sequelize')
// var sequelize = new Sequelize(
//     process.env.DB_NAME,
//     process.env.DB_USER,
//     process.env.DB_PASSWORD,
//     {
//         host: process.env.DB_HOST,
//         dialect: "mysql"
//     }
// );

// try {
//     sequelize.authenticate();
//     console.log("connexion reussi");
// } catch (error) {
//     console.log("connexion pas reussi");
// }

const User = sequelize.define("user", {

    id: {
        type: Sequelize.UUID,
        defaultValue: Sequelize.UUIDV4,
        primaryKey: true,
        allowNull: false
    },
    firstName: {
        type: Sequelize.STRING,
        allowNull: false
    },
    lastName: {
        type: Sequelize.STRING,
        allowNull: false
    },
    email: {
        type: Sequelize.STRING,
        allowNull: false
    },
    password: {
        type: Sequelize.STRING,
        allowNull: false
    },
    admin: {
        type: Sequelize.BOOLEAN,
        allowNull: true,
        defaultValue: false
    },
});

module.exports.User = User;
