const Sequelize = require('sequelize');
const sequelize = require('../config/database');
// const mysql = require('mysql2');
require('dotenv').config();
const User = require('./User');

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
// Forum.hasMany(users, {
//     targetKey: 'id'
// });
// Forum.associate = (models) => {
//     Forum.hasMany(models.users, {
//         foreignKey: 'idUser'
//     });
// }

// Forum.belongsTo(User.User, {
//     targetKey: 'idUser'
// });

// Forum.sync({
//     alter: true
// });

module.exports.Forum = Forum;

// class Forum {
//     constructor() { }

//     getPosts() {
//         return db.query('SELECT forum.id, forum.idUser, forum.comment, forum.date, user.firstName, user.lastName FROM forum JOIN user ON forum.idUser = user.id ORDER BY date DESC');

//     }

//     sendComment(post) {
//         return db.query('INSERT INTO forum SET ?', post);
//     }

//     deletePost(postId) {
//         return db.query('DELETE FROM forum WHERE ID = ?', postId)
//     }

// }

// module.exports = Forum;