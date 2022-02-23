const express = require('express');
const router = express.Router();

const ForumController = require('../controllers/forum');
const auth = require('../middleware/auth');
const multer = require('../middleware/multer-post-config')

router.post('/', auth, multer, ForumController.createPost);
// router.post('/', auth, ForumController.createPostWithfile);
router.get('/', auth, ForumController.getAllPost);
router.delete('/:id', auth, ForumController.deletePost);

module.exports = router;