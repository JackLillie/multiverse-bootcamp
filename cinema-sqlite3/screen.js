const { db, closeDb } = require("./db");

class Screen {
  constructor(cinemaId, numOfSeats) {
    this.cinemaId = cinemaId;
    this.numOfSeats = numOfSeats;
  }
  async save() {
    const cinemaId = this.cinemaId;
    const numOfSeats = this.numOfSeats;
    await db.serialize(function () {
      db.run(
        "CREATE TABLE IF NOT EXISTS `screens` (`id` INTEGER PRIMARY KEY AUTOINCREMENT, `numOfSeats` NUMBER, `cinemaId` INTEGER REFERENCES `cinemas` (`id`) ON DELETE SET NULL ON UPDATE CASCADE); "
      );

      db.run(
        `INSERT INTO screens ('numOfSeats', 'cinemaId') VALUES ('${numOfSeats}', '${cinemaId}')`
      );
    });
  }
  async getData() {
    const cinemaId = this.cinemaId;
    await db.serialize(function () {
      db.all(
        `SELECT * FROM screens WHERE cinemaId='${cinemaId}'`,
        [],
        (err, rows) => {
          if (err) {
            throw err;
          }
          rows.forEach((row) => {
            console.log(row);
          });
        }
      );
    });
  }
}

module.exports = Screen;
