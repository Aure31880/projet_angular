require('dotenv').config();

var Sequelize = require('sequelize')
var sequelize = new Sequelize(
    process.env.DB_NAME,
    process.env.DB_USER,
    process.env.DB_PASSWORD,
    {
        host: process.env.DB_HOST,
        dialect: "mysql"
    }
);

try {
    sequelize.authenticate();
    console.log("connexion reussi");
} catch (error) {
    console.log("connexion pas reussi");
}
// var exports = module.exports = {};
// exports.sequelize = sequelize;
module.exports = sequelize;