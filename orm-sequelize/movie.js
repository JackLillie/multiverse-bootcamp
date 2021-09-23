const sequelize = require("./db");
const { DataTypes, Model } = require("sequelize");

class Movie extends Model {}

Movie.init(
  {
    title: DataTypes.STRING,
    durationInMinutes: DataTypes.DOUBLE,
  },
  {
    sequelize,
    modelName: "movie",
    timestamps: false,
  }
);

module.exports = Movie;
