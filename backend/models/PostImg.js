const db = require('../config/database');

class PostImg {

    constructor() { }

    getPosts() {
        return db.query('SELECT post_image.id, post_image.idUser, post_image.imgUrl, post_image.date, user.firstName, user.lastName FROM post_image JOIN user ON post_image.idUser = user.id ORDER BY date DESC');

    }

    sendImg(post) {
        return db.query('INSERT INTO forum SET ?', post);
    }

}

module.exports = PostImg;