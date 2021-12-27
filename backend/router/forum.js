const express = require('express');
const router = express.Router();

const ForumController = require('../controllers/forum');
// const auth = require('../middleware/auth');

router.post('/', ForumController.createPost);
router.get('/', ForumController.getAllPost);
router.delete('/:id', ForumController.deletePost);

// router.put('/:id', auth, ForumController.updatePost);

module.exports = router;