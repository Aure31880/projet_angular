const multer = require('multer');
const fs = require('fs');

const dir = './post-images'

const MIME_TYPES = {
    'image/jpg': 'jpg',
    'image/jpeg': 'jpg',
    'image/png': 'png',
    'image/gif': 'gif',
}

const storage = multer.diskStorage({
    desitnation: (req, file, callback) => {
        if (!fs.existsSync(dir)) {
            fs.mkdirSync(dir)
        }
        callback(null, 'post-images');
    },
    filename: (req, file, callback) => {
        const name = file.originalname.split(' ').join('_');
        const extension = MIME_TYPES[file.mimetype];
        callback(null, name + Date.now() + '.' + extension);
    }
});

module.exports = multer({ storage: storage }).single('image');