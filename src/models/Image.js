const { Sequelize, DataTypes } = require("sequelize");
const sequelize = require("../db/sequelize");

const Image = sequelize.define("Image", {
  id: {
    type: DataTypes.UUID,
    primaryKey: true,
    allowNull: false,
  },
  name: {
    type: DataTypes.STRING,
  },

  imageUrl: {
    type: DataTypes.STRING,
    allowNull: false,
  },
});

module.exports = Image;
