const sequelize = require("./db");
const Cinema = require("./cinema");
const Screening = require("./screening");
const Movie = require("./movie");
const Screen = require("./screen");
const Booking = require("./booking");
const setupDb = require("./setupDb");

async function sandbox() {
  await setupDb();
  //Create cinemas
  const london = await Cinema.create({
    location: "London",
  });
  const norwich = await Cinema.create({
    location: "Norwich",
  });
  const dublin = await Cinema.create({
    location: "Dublin",
  });

  //Create movies
  const blackWidow = await Movie.create({
    title: "Black Widow",
    durationInMinutes: 133,
  });

  const avengersEndGame = await Movie.create({
    title: "Avengers: Endgame",
    durationInMinutes: 182,
  });

  //Create screens
  const londonScreen1 = await london.createScreen({
    numOfSeats: 200,
  });
  const londonScreen2 = await london.createScreen({
    numOfSeats: 150,
  });

  const norwichScreen1 = await norwich.createScreen({
    numOfSeats: 110,
  });
  const norwichScreen2 = await norwich.createScreen({
    numOfSeats: 75,
  });

  const dublinScreen1 = await dublin.createScreen({
    numOfSeats: 160,
  });
  const dublinScreen2 = await dublin.createScreen({
    numOfSeats: 40,
  });

  //Create screenings
  const blackWidowLondonScreen1 = await blackWidow.createScreening({
    screenId: londonScreen1.get("id"),
    startTime: "2021-09-23 16:00:00",
  });

  const blackWidowNorwichScreen2 = await blackWidow.createScreening({
    screenId: norwichScreen2.get("id"),
    startTime: "2021-09-27 18:30:00",
  });

  const avengersEndGameDublinScreen1 = await avengersEndGame.createScreening({
    screenId: dublinScreen1.get("id"),
    startTime: "2021-09-24 13:15:00",
  });

  //Create bookings
  const bookingForBlackWidowLondon =
    await blackWidowLondonScreen1.createBooking({
      customerEmail: "jack@jacklillie.dev",
      seatNumber: "E15",
    });
}

sandbox();
