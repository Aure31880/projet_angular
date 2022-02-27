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

// User.associate = (models) => {
//     User.belongsTo(models.forums, {
//         targetKey: 'idUser'
//     })
// }



// User.sync({
//     alter: true
// });

module.exports.User = User;

// class User {
//     constructor() { }


//     // PACKAGE MYSQL
//     // saveUser(user) {
//     //     return db.query('INSERT INTO user SET ?', user);
//     // }

//     // getAllUser() {
//     //     return db.query('SELECT * FROM user');
//     // }

//     // getUserByEmail(userMail) {
//     //     let sql = 'SELECT * FROM user WHERE email= ?'
//     //     sql = mysql.format(sql, userMail)

//     //     return db.execute(sql);
//     // }

//     // getUserById(idUser) {
//     //     return db.query('SELECT * FROM user WHERE id = ?', idUser)
//     // }

//     // deleteUser(idUser) {
//     //     return db.query('DELETE FROM user WHERE id = ?', idUser);
//     // }

//     // updatePassword(updateInfoUser) {
//     //     let sql = 'UPDATE user SET password = ? WHERE id = ?'
//     //     sql = mysql.format(sql, updateInfoUser);

//     //     return db.execute(sql);
//     // }

//     // updateUserInfo(updateInfoUser) {
//     //     let sql = 'UPDATE user SET email = ? WHERE id = ?'
//     //     sql = mysql.format(sql, updateInfoUser);

//     //     return db.execute(sql);
//     // }

// }

// module.exports = User;