const bcrypt = require('bcrypt');
const MD5 = require("crypto-js/md5");
const express = require('express');
const User = require('../models/User');
const jwt = require('jsonwebtoken');


exports.signup = (req, res, next) => {
    console.log('test signup controller')
    if (!req.body.firstName ||
        !req.body.lastName ||
        !req.body.email ||
        !req.body.password) {
        return res.status(400).json({ message: "empty field !" })
    }
    const saltRounds = 10;
    bcrypt.hash(req.body.password, saltRounds)
        .then(hash => {
            // Get user form's values
            const email = MD5(req.body.email).toString()
            const user = {
                firstName: req.body.firstName,
                lastName: req.body.lastName,
                password: hash,
                email: email,
                admin: 0
            }
            console.log('user object')
            console.log(user);
            User.User.create(user)
                .then(result => res.status(201).json(result))
                .catch(error => res.status(400).json(error));
        })
        .catch(error => res.status(500).json(error));
}

exports.login = async (req, res, next) => {
    if (!req.body.email || !req.body.password) {
        res.status(400).json({ message: "Field empty !" })
    }
    const email = MD5(req.body.email).toString()
    await User.User.findOne({ where: { email: email } })
        .then(result => {
            const user = result;
            if (!result) {
                return res.status(401).json({ message: "Utilisateur introuvable !" });
            }
            const passToCompare = result.password;
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
    await User.User.findAll()
        .then(result => res.status(201).json(result))
        .catch(() => res.status(400).json({ message: 'Erreur get user by email !' }));
}

exports.getOneUser = async (req, res, next) => {
    const email = req.params.email;
    await User.User.findOne({ where: { email: MD5(email).toString() } })
        .then(result => res.status(200).json(result))
        .catch(error => res.status(400).json({ error }));
}

exports.updatePassword = (req, res, next) => {
    const idUser = req.params.id;
    const oldPass = req.body.oldPassword;
    const newPass = req.body.newPassword;
    console.log(idUser);
    console.log(oldPass);
    console.log(newPass);

    // Comparer le oldPass avec methode compare de mysql si ok alors on continue sinon on crash
    User.User.findOne({ where: { id: idUser } })
        .then(result => {
            console.log(result)
            if (!result) {
                res.status(400).json(new Error('Bad request, unknown id !'))
            } else {
                const passToCompare = result.password;
                console.log(passToCompare)
                bcrypt.compare(oldPass, passToCompare)
                    .then(validPass => {
                        console.log('validPass');
                        console.log(validPass);
                        if (!validPass) {
                            res.status(400).json(new Error('Bad request, mot de passe invalid !'))
                        } else {
                            const saltRounds = 10;
                            bcrypt.hash(newPass, saltRounds)
                                .then(newUserPass => {
                                    if (!newUserPass) {
                                        res.status(400).json(new Error('Bad request !'))
                                    } else {
                                        // let arrToUpdate = [newUserPass, idUser]
                                        User.User.update({ password: newUserPass },
                                            {
                                                where: {
                                                    id: idUser
                                                }
                                            })
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
}

exports.updateEmail = (req, res, next) => {
    console.log(req.body);
    const oldEmail = MD5(req.body.infoToUpdate.email).toString();
    console.log('oldEmail');
    console.log(oldEmail);
    const emailToCheck = MD5(req.body.infoToUpdate.newEmail).toString();
    console.log('emailToCheck');
    console.log(emailToCheck);
    const idUser = req.body.infoToUpdate.idUser;
    console.log('idUser');
    console.log(idUser);

    // let infoForUpdate = [emailToCheck, idUser]
    User.User.findOne({ where: { email: oldEmail } })
        .then(result => {
            if (result) {
                User.User.update({ email: emailToCheck },
                    {
                        where: {
                            id: idUser
                        }
                    })
                    .then(result => res.status(200).json({ message: 'Email modifier !' }))
                    .catch(error => res.status(404).json(error));
            }
        })
        .catch(error => res.status(500).josn({ error }));
}

// exports.login = (req, res, next) => {
//     if (!req.body.email || !req.body.password) {
//         res.status(400).json({ message: "Field empty !" })
//     }
//     userModel.getUserByEmail(req.body.email)
//         .then(result => {
//             const user = result[0][0];
//             if (!result) {
//                 return res.status(401).json({ message: "Utilisateur introuvable !" });
//             }
//             const passToCompare = result[0][0].password;
//             bcrypt.compare(req.body.password, passToCompare)
//                 .then(valid => {
//                     if (!valid) {
//                         return res.status(401).json({ message: "Mot de passe incorrect !" });
//                     }
//                     res.status(200).json({
//                         userId: user.id,
//                         token: jwt.sign(
//                             { userId: user.id },
//                             'RANDOM_TOKEN_SECRET',
//                             { expiresIn: '24h' }
//                         )
//                     });
//                 })
//                 .catch(error => res.status(500).json({ message: "First Error" }));
//         })
//         .catch(error => res.status(500).json({ message: "Second Error" }));
// }

// exports.signup = (req, res, next) => {
//     if (!req.body.firstName ||
//         !req.body.lastName ||
//         !req.body.email ||
//         !req.body.password) {
//         return res.status(400).json({ message: "empty field !" })
//     }
//     const saltRounds = 10;
//     bcrypt.hash(req.body.password, saltRounds)
//         .then(hash => {
//             // Get user form's values
//             const user = {
//                 firstName: req.body.firstName,
//                 lastName: req.body.lastName,
//                 password: hash,
//                 email: req.body.email,
//                 admin: 0
//             }
//             userModel.saveUser(user)
//                 .then((result) => res.status(201).json(result))
//                 .catch(error => res.status(400).json(error));
//         })
//         .catch(error => res.status(500).json(error))
// }


// exports.login = (req, res, next) => {
//     if (!req.body.email || !req.body.password) {
//         res.status(400).json({ message: "Field empty !" })
//     }
//     userModel.getUserByEmail(req.body.email)
//         .then(result => {
//             const user = result[0][0];
//             if (!result) {
//                 return res.status(401).json({ message: "Utilisateur introuvable !" });
//             }
//             const passToCompare = result[0][0].password;
//             bcrypt.compare(req.body.password, passToCompare)
//                 .then(valid => {
//                     if (!valid) {
//                         return res.status(401).json({ message: "Mot de passe incorrect !" });
//                     }
//                     res.status(200).json({
//                         userId: user.id,
//                         token: jwt.sign(
//                             { userId: user.id },
//                             'RANDOM_TOKEN_SECRET',
//                             { expiresIn: '24h' }
//                         )
//                     });
//                 })
//                 .catch(error => res.status(500).json({ message: "First Error" }));
//         })
//         .catch(error => res.status(500).json({ message: "Second Error" }));
// }

// exports.getusers = async (req, res, next) => {
//     await User.findAll()
//         .then(result => res.status(201).json(result))
//         .catch(() => res.status(400).json({ message: 'Erreur get user by email !' }));
// }

// exports.getOneUser = async (req, res, next) => {
//     // console.log("getOneUser controller back");
//     // console.log(req.params);
//     const email = req.params.email;
//     await User.User.findOne({ where: { email: email } })
//         .then(result => res.status(200).json(result))
//         .catch(error => res.status(400).json({ error }));
// }

// exports.deleteUserAccount = async (req, res) => {
//     if (!req.params.id) {
//         res.status(400).send(new Error('Bad request !'))
//     }
//     const id = req.params.id;

//     await userModel.getUserById(id)
//         .then(result => {
//             if (!result) {
//                 res.status(400).send(new Error('Id does not exist !'))
//             }
//             const idUser = result[0][0].id;
//             userModel.deleteUser(idUser)
//                 .then(() => res.status(200).json({ message: "Account ha  s been deleted !" }))
//                 .catch(error => res.status(400).json(error));
//         })
//         .catch(error => res.status(500).json(error))
// }

// exports.updatePassword = (req, res, next) => {
//     const idUser = req.params.id;
//     const oldPass = req.body.oldPassword;
//     const newPass = req.body.newPassword;

//     // Comparer le oldPass avec methode compare de mysql si ok alors on continue sinon on crash
//     userModel.getUserById(idUser)
//         .then(result => {
//             if (!result) {
//                 res.status(400).json(new Error('Bad request, unknown id !'))
//             } else {
//                 const passToCompare = result[0][0].password;
//                 bcrypt.compare(oldPass, passToCompare)
//                     .then(validPass => {
//                         if (!validPass) {
//                             res.status(400).json(new Error('Bad request, mot de passe invalid !'))
//                         } else {
//                             const saltRounds = 10;
//                             bcrypt.hash(newPass, saltRounds)
//                                 .then(newUserPass => {
//                                     if (!newUserPass) {
//                                         res.status(400).json(new Error('Bad request !'))
//                                     } else {
//                                         let arrToUpdate = [newUserPass, idUser]
//                                         userModel.updatePassword(arrToUpdate)
//                                             .then(result => res.status(201).json(result))
//                                             .catch(error => res.status(400).json(error));
//                                     }
//                                 })
//                                 .catch(error => res.status(500).json(error));
//                         }
//                     })
//                     .catch(error => res.status(400).json(error));
//             }
//         })
//         .catch(error => res.status(500).json(error));
// }

// exports.updateEmail = (req, res, next) => {
//     const emailToCheck = req.body.infoToUpdate.newEmail;
//     const idUser = req.body.infoToUpdate.idUser;
//     let infoForUpdate = [emailToCheck, idUser]
//     userModel.getUserByEmail(infoForUpdate)
//         .then(result => {
//             if (!result[0][0]) {
//                 userModel.updateUserInfo(infoForUpdate)
//                     .then(result => res.status(200).json({ message: 'Email modifier !' }))
//             } else {
//                 console.log('Already exists !');
//             }
//         })

// }

