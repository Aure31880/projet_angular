const express = require('express');
const router = express.Router();
const UserController = require('../controllers/user');
const auth = require('../middleware/auth');
const passValidator = require('../middleware/pass-validator');
const limiter = require('../middleware/limiter');


router.post('/login', limiter, UserController.login);
router.post('/signup', passValidator, UserController.signup);
router.get('/users', UserController.getusers);
router.get('/users/:email', auth, UserController.getOneUser);
router.delete('/users/:id', auth, UserController.deleteUserAccount);
router.put('/users/:id', auth, UserController.updatePassword);

module.exports = router;