const bcrypt = require('bcrypt');
const { json } = require('express');
const express = require('express');
const db = require("../config/database");
const User = require('../models/User');
const validateEmail = require('../controllers/validator');


exports.signup = async (req, res, next) => {
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
            userModel.getUserByEmail(user.email)
                .then(userEmail => {
                    if (userEmail) {
                        return res.status(403).json({ message: "that email is already exist !" })
                    }
                })
                .catch(error => res.status(500).json(error))

            userModel.saveUser(user)
                .then((result) => res.status(200).json(result))
                .catch(error => res.status(400).json(error));
        })
        // .then(() => res.status(200).json({ message: "Vous êtes inscript " }))
        .catch(error => res.status(500).json(error))
}


exports.login = (req, res) => {
    // try {
    //     let { email, password } = req.body;
    // } catch (error) {
    //     next(error);
    // }
}

exports.getusers = async (req, res, next) => {
    const userModel = new User();

    await userModel.getAllUser()
        .then(result => res.status(201).json(result[0]))
        .catch(() => res.status(400).json({ message: 'Erreur get user by email !' }));

}

exports.getOneUser = async (req, res, next) => {
    const userModel = new User();
    const email = req.body.email;
    console.log(email);
    await userModel.getUserByEmail(email)
        .then((result) => res.status(200).json(result))
        .catch(error => res.status(400).json({ error }));

}

