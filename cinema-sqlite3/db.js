const sqlite3 = require("sqlite3");
const path = require("path");

let db = new sqlite3.Database(path.join(__dirname, "db.sqlite"), (err) => {
  if (err) {
    console.error(err.message);
  }
});

function closeDb() {
  db.close((err) => {
    if (err) {
      console.error(err.message);
    }
  });
}

module.exports = { db, closeDb };
