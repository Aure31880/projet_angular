const express = require('express');
const router = express.Router();

const ForumController = require('../controllers/forum');
const auth = require('../middleware/auth');

router.post('/', auth, ForumController.createPost);
router.post('/', auth, ForumController.createPostWithfile);
router.get('/', auth, ForumController.getAllPost);
router.delete('/:id', auth, ForumController.deletePost);

module.exports = router;