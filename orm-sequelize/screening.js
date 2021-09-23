const sequelize = require("./db");
const { DataTypes, Model } = require("sequelize");

class Screening extends Model {}

Screening.init(
  {
    startTime: DataTypes.DATE,
  },
  {
    sequelize,
    modelName: "screening",
    timestamps: false,
  }
);

module.exports = Screening;
