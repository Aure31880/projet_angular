const express = require('express');
const router = express.Router();

const ForumController = require('../controllers/forum');
const auth = require('../middleware/auth');

router.post('/', auth, ForumController.createPost);
router.get('/', auth, ForumController.getAllPost);
router.delete('/:id', auth, ForumController.deletePost);

// router.put('/:id', auth, ForumController.updatePost);

module.exports = router;