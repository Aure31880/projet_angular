const db = require('../config/database');
const mysql = require('mysql2');

class Forum {
    constructor() { }

    getPosts() {
        return db.query('SELECT forum.idUser, forum.comment, forum.date, user.firstName, user.lastName FROM forum JOIN user ON forum.idUser = user.id ORDER BY date DESC');

    }

    sendComment(post) {
        return db.query('INSERT INTO forum SET ?', post);
    }

}

module.exports = Forum;