const express = require('express');
const PostImg = require('../models/PostImg');

const post = new PostImg();

exports.getPosts = (req, res, next) => {
    console.log('Test request all posts');
}

exports.createPostWithImg = (req, res, next) => {
    console.log(req.body);
}