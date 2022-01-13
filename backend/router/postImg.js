const express = require('express');
const router = express.Router();

const PostImgController = require('../controllers/postImage');
const auth = require('../middleware/auth');

router.get('/', auth, PostImgController.getPosts);
router.post('/', auth, PostImgController.createPostWithImg);

module.exports = router;