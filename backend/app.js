require('dotenv').config();
const express = require('express');
const app = express();
const UserRoutes = require('./router/user');
const ForumRoutes = require('./router/forum');
const mongoSanitize = require('express-mongo-sanitize');
const path = require('path');

// Middleware for header requests
app.use((req, res, next) => {
    res.setHeader('Access-Control-Allow-Origin', '*');
    res.setHeader('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content, Accept, Content-Type, Authorization');
    res.setHeader('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE, PATCH, OPTIONS');
    next();
});
app.use(express.json());
// Clean data user
app.use(mongoSanitize());
app.use('/images', express.static(path.join(__dirname, 'images')));

// Route for api calls
app.use('/api/auth', UserRoutes);
app.use('/api/forum', ForumRoutes);

module.exports = app;