const express = require('express');
const router = express.Router();
const UserController = require('../controllers/user');
const auth = require('../middleware/auth');


router.post('/login', UserController.login);
router.post('/signup', UserController.signup);
router.get('/users', UserController.getusers);
router.get('/users/:email', auth, UserController.getOneUser);
router.delete('/users/:id', auth, UserController.deleteUserAccount);
router.put('/users/:id', auth, UserController.updatePassword);

module.exports = router;