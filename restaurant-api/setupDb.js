const sequelize = require("./db");
const Company = require("./Company");
const Menu = require("./Menu");
const Location = require("./Location");

async function setupDb() {
  Company.hasMany(Menu);
  Menu.belongsTo(Company);

  Company.hasMany(Location);
  Location.belongsTo(Company);

  await sequelize.sync({ force: true });
}

module.exports = setupDb;
