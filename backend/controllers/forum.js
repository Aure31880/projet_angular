const express = require('express');
// const Forum = require('../models/Forum');
// const User = require('../models/User')
const Forum = require("../models/Forum");
const User = require('../models/User');

Forum.Forum.belongsTo(User.User, { foreignKey: "idUser" })

exports.getAllPost = async (req, res, next) => {
    await Forum.Forum.findAll({
        include: [{ model: User.User }],
        order: [["createdAt", "DESC"]]
    })
        .then(result => res.status(201).json(result))
        .catch(() => res.status(400).json({ message: "Impossible de récupérer les posts !" }))
}

exports.createPost = async (req, res, next) => {
    const post = JSON.parse(req.body.forum)
    if (!post.idUser) {
        res.status(404).send(new Error('Bad request !'))
    } else {
        console.log(req.body.forum)
        const idUser = post.idUser;
        console.log(idUser);
        const comment = post.comment;
        const image = post.imageUrl;
        console.log(image);
        const arrCommenttoSend = {
            idUser: idUser,
            comment: comment,
            imageUrl: `${req.protocol}://${req.get('host')}/images/${req.file.filename}`,
            date: new Date(),
        }

        await Forum.Forum.create(arrCommenttoSend)
            .then(() => res.status(201).json({ message: "Votre message à bien été envoyé !" }))
            .catch(() => res.status(400).json({ message: "Erreur lors de l'envoie du commentaire !" }));
    }
}

exports.deletePost = async (req, res, next) => {
    console.log(req.params.id);
    if (!req.params.id) {
        return res.status(400).send(new Error('Bad Request !'))
    }
    const postId = req.params.id;
    await Forum.Forum.destroy({ where: { id: postId } })
        .then(() => res.status(201).json({ message: "Commentaire supprimé !" }))
        .catch(error => res.status(400).json(error))

}
