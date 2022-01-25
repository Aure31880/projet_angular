const db = require("../config/database");
const mysql = require("mysql2");

class User {
    constructor() { }

    saveUser(user) {
        return db.query('INSERT INTO user SET ?', user);
    }

    getAllUser() {
        return db.query('SELECT * FROM user');
    }

    getUserByEmail(userMail) {
        // return db.query('SELECT email FROM user WHERE email = ?', userMail)

        let sql = 'SELECT * FROM user WHERE email= ?'
        sql = mysql.format(sql, userMail)

        return db.execute(sql);
    }

    getUserById(idUser) {
        return db.query('SELECT * FROM user WHERE id = ?', idUser)
    }

    deleteUser(idUser) {
        return db.query('DELETE FROM user WHERE id = ?', idUser);
    }

    updatePassword(updateInfoUser) {
        let sql = 'UPDATE user SET password = ? WHERE id = ?'
        sql = mysql.format(sql, updateInfoUser);

        return db.execute(sql);
    }

    updateUserInfo(updateInfoUser) {
        let sql = 'UPDATE user SET email = ? WHERE id = ?'
        sql = mysql.format(sql, updateInfoUser);

        return db.execute(sql);
    }

}

module.exports = User;