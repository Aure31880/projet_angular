const passwordSchema = require('../models/Password-validator');

module.exports = (req, res, next) => {
    if (!passwordSchema.validate(req.body.password)) {
        return res.status(401).json({ message: "Le mot de passe doit comporter au moins 8 caractères et 2 chiffres" })
    } else {
        next();
    }
}