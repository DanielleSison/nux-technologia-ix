const { Sequelize, Model, DataTypes } = require('sequelize');
const sequelize = require('../config/config');

// Creates Comment Model
class Comment extends Model { }

Comment.init(
    {
        body: {
            type: DataTypes.STRING,
            allowNull: false
        }
    },
    {
        sequelize
    }
);

module.exports = Comment;