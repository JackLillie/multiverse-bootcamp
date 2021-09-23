const { db, closeDb } = require("./db");

class Booking {
  constructor(customerEmail, seatNumber, screeningId) {
    this.customerEmail = customerEmail;
    this.seatNumber = seatNumber;
    this.screeningId = screeningId;
  }
  async save() {
    const customerEmail = this.customerEmail;
    const seatNumber = this.seatNumber;
    const screeningId = this.screeningId;
    await db.serialize(function () {
      db.run(
        "CREATE TABLE IF NOT EXISTS `bookings` (`id` INTEGER PRIMARY KEY AUTOINCREMENT, `customerEmail` VARCHAR(255), `seatNumber` VARCHAR(255), `screeningId` INTEGER REFERENCES `screenings` (`id`) ON DELETE SET NULL ON UPDATE CASCADE);"
      );

      db.run(
        `INSERT INTO bookings ('customerEmail', 'seatNumber', 'screeningId') VALUES ('${customerEmail}', '${seatNumber}', '${screeningId}')`
      );
    });
  }
  async getData() {
    const email = this.email;
    await db.serialize(function () {
      db.get(`SELECT * FROM bookings WHERE email='${email}'`, (err, row) => {
        return row
          ? console.log(row)
          : console.log(`No booking found with the email: ${email}`);
      });
    });
  }
}

module.exports = Booking;
