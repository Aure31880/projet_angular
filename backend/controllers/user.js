const bcrypt = require('bcrypt');
const { json } = require('express');
const express = require('express');
const User = require('../models/User');
const validateEmail = require('../controllers/validator');
const jwt = require('jsonwebtoken');


exports.signup = (req, res, next) => {
    if (!req.body.firstName ||
        !req.body.lastName ||
        !req.body.email ||
        !req.body.password) {
        return res.status(400).json({ message: "empty field !" })
    }

    const userModel = new User();
    const saltRounds = 10;
    bcrypt.hash(req.body.password, saltRounds)
        .then(hash => {
            // Get user form's values
            const user = {
                firstName: req.body.firstName,
                lastName: req.body.lastName,
                password: hash,
                email: req.body.email

            }
            userModel.saveUser(user)
                .then((result) => res.status(200).json(result))
                .catch(error => res.status(400).json(error));
        })
        // .then(() => res.status(200).json({ message: "Vous êtes inscript " }))
        .catch(error => res.status(500).json(error))
}


exports.login = (req, res, next) => {
    if (!req.body.email || !req.body.password) {
        res.status(400).json({ message: "Field empty !" })
    }
    console.log(req.body.email);
    const userModel = new User()
    userModel.getUserByEmail(req.body.email)
        .then(result => {
            console.log(result);
            if (!result) {
                return res.status(401).json({ message: "Utilisateur introuvable !" });
            }
            const passToCompare = result[0][0].password;
            bcrypt.compare(req.body.password, passToCompare)
                .then(valid => {
                    if (!valid) {
                        return res.status(401).json({ message: "Mot de passe incorrect !" });
                    }
                    res.status(200).json({
                        userId: result.id,
                        token: jwt.sign(
                            { userId: result.id },
                            'RANDOM_TOKEN_SECRET',
                            { expiresIn: '24h' }
                        )
                    });
                })
                .catch(error => res.status(500).json({ message: "First Error" }));
        })
        .catch(error => res.status(500).json({ message: "Second Error" }));
}

exports.getusers = async (req, res, next) => {
    const userModel = new User();

    await userModel.getAllUser()
        .then(result => res.status(201).json(result[0]))
        .catch(() => res.status(400).json({ message: 'Erreur get user by email !' }));

}

exports.getOneUser = async (req, res) => {
    const userModel = new User();
    const email = req.body.email;
    console.log(email);
    await userModel.getUserByEmail(email)
        .then(result => res.status(200).json(result))
        .catch(error => res.status(400).json({ error }));

}

