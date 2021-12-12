// const { check } = require('express-validator');
// const User = require('../models/User');
// const db = require('../config/database');

// module.exports = {
//     validateEmail: check('email')

//         .trim()

//         .normalizeEmail()

//         .isEmail()

//         .withMessage('Invalid email')

//         .custom(async (email) => {
//             const userExist = await User.getUserByEmail({ email })

//             if (userExist) {
//                 throw new error('Email already in use !')
//             }
//         })
// }