const express = require('express');
const router = express.Router();
const UserController = require('../controllers/user');


router.post('/login', UserController.login);
router.post('/signup', UserController.signup);
router.get('/users', UserController.getusers);
router.get('/users/:email', UserController.getOneUser);

module.exports = router;