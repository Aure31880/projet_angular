require('dotenv').config();
const express = require('express');
const app = express();
const UserRoutes = require('./router/user');
const ForumRoutes = require('./router/forum');

app.use((req, res, next) => {
    res.setHeader('Access-Control-Allow-Origin', '*');
    res.setHeader('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content, Accept, Content-Type, Authorization');
    res.setHeader('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE, PATCH, OPTIONS');
    next();
});
app.use(express.json());
app.use('/api/auth', UserRoutes);
app.use('/api/forum', ForumRoutes);
// app.use((req, res) => {
//     res.json({ message: 'Votre requête a bien été reçue !' });
// });

module.exports = app;