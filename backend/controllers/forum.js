const express = require('express');
const Forum = require('../models/Forum');
const forumService = new Forum();

exports.getAllPost = async (req, res, next) => {

    await forumService.getPosts()
        .then(result => res.status(201).json(result[0]))
        .catch(() => res.status(400).json({ message: "Impossible de récupérer les posts !" }))
}

exports.createPost = async (req, res, next) => {
    if (!req.body.idUser | !req.body.comment) {
        res.status(404).send(new Error('Bad request !'))
    }
    await forumService.sendComment()
        .then(result => res.json(201).json({ message: "Votre message à bien été envoyé !" }))
        .catch(() => res.json(400).json(error));
}