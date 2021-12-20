const express = require('express');
const router = express.Router();

// const auth = require('../middleware/auth');
const ForumController = require('../controllers/forum');

router.get('/posts', ForumController.getAllPost);
// router.post('/', auth, ForumController.createPost);
// router.put('/:id', auth, ForumController.updatePost);
// router.delete('/:id', auth, ForumController.deletePost);

module.exports = router;