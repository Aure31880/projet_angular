const express = require('express');
const Forum = require('../models/Forum');

exports.getAllPost = async (req, res, next) => {
    const forumService = new Forum();

    await forumService.getPosts()
        .then(result => res.status(201).json(result[0]))
        .catch(() => res.status(400).json({ message: "Impossible de récupérer les posts !" }))
}