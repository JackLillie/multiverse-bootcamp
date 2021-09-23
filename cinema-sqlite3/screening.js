const { db, closeDb } = require("./db");

class Screening {
  constructor(movieId, screenId, startTime) {
    this.movieId = movieId;
    this.screenId = screenId;
    this.startTime = startTime;
  }
  async save() {
    const movieId = this.movieId;
    const screenId = this.screenId;
    const startTime = this.startTime;
    await db.serialize(function () {
      db.run(
        "CREATE TABLE IF NOT EXISTS `screenings` (`id` INTEGER PRIMARY KEY AUTOINCREMENT, `startTime` DATETIME, `movieId` INTEGER REFERENCES `movies` (`id`) ON DELETE SET NULL ON UPDATE CASCADE, `screenId` INTEGER REFERENCES `screens` (`id`) ON DELETE SET NULL ON UPDATE CASCADE);"
      );

      db.run(
        `INSERT INTO screenings ('startTime', 'movieId', 'screenId') VALUES ('${startTime}','${movieId}','${screenId}')`
      );
    });
  }
  async getData() {
    const movieId = this.movieId;
    await db.serialize(function () {
      db.all(
        `SELECT * FROM screenings WHERE movieId='${movieId}'`,
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

module.exports = Screening;
