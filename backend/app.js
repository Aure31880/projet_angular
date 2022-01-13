require('dotenv').config();
const express = require('express');
const app = express();
const UserRoutes = require('./router/user');
const ForumRoutes = require('./router/forum');
const PostImageRoutes = require('./router/postImg');
const mongoSanitize = require('express-mongo-sanitize');

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

// Route for api calls
app.use('/api/auth', UserRoutes);
app.use('/api/forum', ForumRoutes);
app.use('/api/posts', PostImageRoutes);

module.exports = app;