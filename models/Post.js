const { Sequelize, Model, DataTypes } = require('sequelize');
const sequelize = require('../config/config');

// Creates Post Model
class Post extends Model { }

Post.init(
    {
        title: DataTypes.STRING,
        body: DataTypes.STRING
    },
    {
        sequelize
    }
);

module.exports = Post;