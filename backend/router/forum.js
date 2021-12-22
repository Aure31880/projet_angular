const express = require('express');
const router = express.Router();

const ForumController = require('../controllers/forum');
const auth = require('../middleware/auth');

router.get('/posts', ForumController.getAllPost);
router.post('/posts', ForumController.createPost);
// router.put('/:id', auth, ForumController.updatePost);
// router.delete('/:id', auth, ForumController.deletePost);

module.exports = router;