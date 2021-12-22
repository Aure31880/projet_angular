const db = require('../config/database');
const mysql = require('mysql2');

class Forum {
    constructor(idUser, comment, date) {
        this.idUser = idUser;
        this.comment = comment;
        this.date = date;
    }

    getPosts() {
        return db.query('SELECT * FROM forum');

    }

    sendPost(post) {
        return db.query('INSERT INTO forum SET ?', post)
    }

}

module.exports = Forum;