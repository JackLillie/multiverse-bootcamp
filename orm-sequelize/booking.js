const sequelize = require("./db");
const { DataTypes, Model } = require("sequelize");

class Booking extends Model {}

Booking.init(
  {
    customerEmail: DataTypes.STRING,
    seatNumber: DataTypes.STRING,
  },
  {
    sequelize,
    modelName: "booking",
    timestamps: false,
  }
);

module.exports = Booking;
