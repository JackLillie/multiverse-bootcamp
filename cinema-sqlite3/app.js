const Cinema = require("./cinema");
const Booking = require("./booking");
const Movie = require("./movie");
const Screen = require("./screen");
const Screening = require("./screening");

//Create cinemas
const london = new Cinema("London");
const norwich = new Cinema("Norwich");
const dublin = new Cinema("Dublin");

london.save();
norwich.save();
dublin.save();

//Create movies
const blackWidow = new Movie("Black Widow", 133);
const avengersEndGame = new Movie("Avengers: Endgame", 182);

blackWidow.save();
avengersEndGame.save();

//Create screens
const londonScreen1 = new Screen(1, 200);
const londonScreen2 = new Screen(1, 150);

const norwichScreen1 = new Screen(2, 110);
const norwichScreen2 = new Screen(2, 75);

const dublinScreen1 = new Screen(3, 160);
const dublinScreen2 = new Screen(3, 40);

londonScreen1.save();
londonScreen2.save();

norwichScreen1.save();
norwichScreen2.save();

dublinScreen1.save();
dublinScreen2.save();

//Create screenings
const blackWidowLondonScreen1 = new Screening(1, 1, "2021-09-23 16:00:00");

const blackWidowNorwichScreen2 = new Screening(1, 4, "2021-09-27 18:30:00");

const avengersEndGameDublinScreen1 = new Screening(2, 4, "2021-09-24 13:15:00");

blackWidowLondonScreen1.save();
blackWidowNorwichScreen2.save();
avengersEndGameDublinScreen1.save();

//Create bookings
const bookingForBlackWidowLondon = new Booking("jack@jacklillie.dev", "E15", 1);

bookingForBlackWidowLondon.save();
