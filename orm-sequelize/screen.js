const sequelize = require("./db");
const { DataTypes, Model } = require("sequelize");

class Screen extends Model {}

Screen.init(
  {
    numOfSeats: DataTypes.NUMBER,
  },
  {
    sequelize,
    modelName: "screen",
    timestamps: false,
  }
);

module.exports = Screen;
