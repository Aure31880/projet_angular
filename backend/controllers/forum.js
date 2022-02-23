const express = require('express');
const Forum = require('../models/Forum');
const forumService = new Forum();

exports.getAllPost = async (req, res, next) => {
    await forumService.getPosts()
        .then(result => res.status(201).json(result[0]))
        .catch(() => res.status(400).json({ message: "Impossible de récupérer les posts !" }))
}

exports.createPost = async (req, res, next) => {
    if (!req.body.idUser ||
        !req.body.comment) {
        res.status(404).send(new Error('Bad request !'))
    }

    const idUser = req.body.idUser;
    const comment = req.body.comment;
    const arrCommenttoSend = {
        idUser: idUser,
        comment: comment,
        date: new Date()
    }

    await forumService.sendComment(arrCommenttoSend)
        .then(() => res.status(201).json({ message: "Votre message à bien été envoyé !" }))
        .catch(() => res.status(400).json({ message: "Erreur lors de l'envoie du commentaire !" }));
}

exports.deletePost = (req, res, next) => {
    if (!req.params.id) {
        return res.status(400).send(new Error('Bad Request !'))
    }
    const postId = req.params.id;
    forumService.deletePost(postId)
        .then(() => res.status(201).json({ message: "Commentaire supprimé !" }))
        .catch(error => res.status(400).json(error))

}