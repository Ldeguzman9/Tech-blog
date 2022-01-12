const { Model, DataTypes } = require("sequelize");
const sequelize = require("../config/connection");

// create our Comment model
class Comment extends Model {}

// create fields/columns for Comment model
Comment.init(
  {
    body: {
      type: DataTypes.STRING,
      allowNull: false,
    },
  },
  {
    sequelize,
    freezeTableName: true,
    underscored: true,
    modelName: "post",
  }
);

module.exports = Comment;
