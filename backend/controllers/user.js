const bcrypt = require('bcrypt');
const { json } = require('express');
const express = require('express');
const User = require('../models/User');
const jwt = require('jsonwebtoken');
const userModel = new User();


exports.signup = (req, res, next) => {
    if (!req.body.firstName ||
        !req.body.lastName ||
        !req.body.email ||
        !req.body.password) {
        return res.status(400).json({ message: "empty field !" })
    }
    console.log(req.body.email);
    const saltRounds = 10;
    bcrypt.hash(req.body.password, saltRounds)
        .then(hash => {
            // Get user form's values
            const user = {
                firstName: req.body.firstName,
                lastName: req.body.lastName,
                password: hash,
                email: req.body.email,
                admin: 0
            }
            userModel.saveUser(user)
                .then((result) => res.status(201).json(result))
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
    userModel.getUserByEmail(req.body.email)
        .then(result => {
            // console.log(result[0][0].id);
            const user = result[0][0];
            console.log(user.id);
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
                        userId: user.id,
                        token: jwt.sign(
                            { userId: user.id },
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
    await userModel.getAllUser()
        .then(result => res.status(201).json(result[0]))
        .catch(() => res.status(400).json({ message: 'Erreur get user by email !' }));
}

exports.getOneUser = async (req, res, next) => {
    const email = req.body.email;
    console.log(email);
    await userModel.getUserByEmail(email)
        .then(result => res.status(200).json(result))
        .catch(error => res.status(400).json({ error }));

}

exports.deleteUserAccount = async (req, res) => {
    if (!req.params.id) {
        res.status(400).send(new Error('Bad request !'))
    }
    const id = req.params.id;
    console.log(id);

    await userModel.getUserById(id)
        .then(result => {
            if (!result) {
                res.status(400).send(new Error('Id does not exist !'))
            }
            console.log(result[0][0].id);
            const idUser = result[0][0].id;
            userModel.deleteUser(idUser)
                .then(() => res.status(200).json({ message: "Account ha  s been deleted !" }))
                .catch(error => res.status(400).json(error));
        })
        .catch(error => res.status(500).json(error))

}

exports.updatePassword = (req, res, next) => {
    const idUser = req.params.id;
    const oldPass = req.body.oldPassword;
    const newPass = req.body.newPassword;

    // Comparer le oldPass avec methode compare de mysql si ok alors on continue sinon on crash
    userModel.getUserById(idUser)
        .then(result => {
            if (!result) {
                res.status(400).json(new Error('Bad request, unknown id !'))
            } else {
                const passToCompare = result[0][0].password;
                bcrypt.compare(oldPass, passToCompare)
                    .then(validPass => {
                        if (!validPass) {
                            res.status(400).json(new Error('Bad request, mot de passe invalid !'))
                        } else {
                            const saltRounds = 10;
                            bcrypt.hash(newPass, saltRounds)
                                .then(newUserPass => {
                                    if (!newUserPass) {
                                        res.status(400).json(new Error('Bad request !'))
                                    } else {
                                        let arrToUpdate = [newUserPass, idUser]
                                        userModel.updatePassword(arrToUpdate)
                                            .then(result => res.status(201).json(result))
                                            .catch(error => res.status(400).json(error));
                                    }
                                })
                                .catch(error => res.status(500).json(error));
                        }
                    })
                    .catch(error => res.status(400).json(error));
            }
        })
        .catch(error => res.status(500).json(error));

    // On récupère l'id user et le newPass pour l'envoyer à la methode updatepass du model user
}

