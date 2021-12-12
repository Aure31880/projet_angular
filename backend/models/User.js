const db = require("../config/database");
const mysql = require("mysql2");

class User {
    constructor(firstName, lastName, email, password) {
        this.firstName = firstName;
        this.lastName = lastName;
        this.email = email;
        this.password = password;
    }

    saveUser(user) {
        return db.query('INSERT INTO user SET ?', user);
    }

    getAllUser() {
        return db.query('SELECT * FROM user');
    }

    getUserByEmail(userMail) {
        return db.query('SELECT email FROM user WHERE email =  ? ', userMail);
    }

}

module.exports = User;