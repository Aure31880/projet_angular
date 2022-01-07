var passwordValidator = require('password-validator');

var passwordSchema = new passwordValidator();

passwordSchema
    .is().min(8)
    .has().digits(2)
    .has().not().spaces()
    .is().not().oneOf(['Password', 'Passw0rd', 'Password123', 'password']);

module.exports = passwordSchema;