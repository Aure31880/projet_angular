const express = require('express');
const Post = require('../models/PostImg');

const post = new Post();

exports.getPosts = (req, res, next) => {
    console.log('Test request all posts');
}

exports.createPostWithImg = (req, res, next) => {
    console.log(req.body);
}