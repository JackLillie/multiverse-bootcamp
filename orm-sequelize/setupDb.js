const sequelize = require("./db");
const Cinema = require("./cinema");
const Screening = require("./screening");
const Movie = require("./movie");
const Screen = require("./screen");
const Booking = require("./booking");

async function setupDb() {
  Movie.hasMany(Screening);
  Screening.belongsTo(Movie);

  Screen.hasMany(Screening);
  Screening.belongsTo(Screen);

  Screening.hasMany(Booking);
  Booking.belongsTo(Screening);

  Cinema.hasMany(Screen);
  Screen.belongsTo(Cinema);
  await sequelize.sync({ force: true });
}

module.exports = setupDb;
