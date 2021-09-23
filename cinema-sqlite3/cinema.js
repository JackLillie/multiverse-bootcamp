const { db, closeDb } = require("./db");

class Cinema {
  constructor(location) {
    this.location = location;
  }
  async save() {
    const location = this.location;
    await db.serialize(function () {
      db.run(
        "CREATE TABLE IF NOT EXISTS `cinemas` (`id` INTEGER PRIMARY KEY AUTOINCREMENT, `location` VARCHAR(255));"
      );

      db.run(`INSERT INTO cinemas (location) VALUES ('${location}')`);
    });
  }
  async getData() {
    const location = this.location;
    await db.serialize(function () {
      db.get(
        `SELECT * FROM cinemas WHERE location='${location}'`,
        (err, row) => {
          return row
            ? console.log(row)
            : console.log(`No cinema found with the location: ${location}`);
        }
      );
    });
  }
  async updateName(newLocation) {
    const oldLocation = this.location;
    this.location = newLocation;
    await db.serialize(function () {
      db.run(
        `UPDATE cinemas SET location='${newLocation}' WHERE location='${oldLocation}'`
      );
    });
  }
}

module.exports = Cinema;
