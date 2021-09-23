const { db, closeDb } = require("./db");

class Movie {
  constructor(title, durationInMinutes) {
    this.title = title;
    this.durationInMinutes = durationInMinutes;
  }
  async save() {
    const title = this.title;
    const durationInMinutes = this.durationInMinutes;
    await db.serialize(function () {
      db.run(
        "CREATE TABLE IF NOT EXISTS `movies` (`id` INTEGER PRIMARY KEY AUTOINCREMENT, `title` VARCHAR(255), `durationInMinutes` DOUBLE PRECISION);"
      );

      db.run(
        `INSERT INTO movies ('title', 'durationInMinutes') VALUES ('${title}', '${durationInMinutes}')`
      );
    });
  }
  async getData() {
    const title = this.title;
    await db.serialize(function () {
      db.get(`SELECT * FROM movies WHERE title='${title}'`, (err, row) => {
        return row
          ? console.log(row)
          : console.log(`No movie found with the title: ${title}`);
      });
    });
  }
}
module.exports = Movie;
