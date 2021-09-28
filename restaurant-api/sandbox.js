const setupDb = require("./setupDb");
const Company = require("./Company");
const Menu = require("./Menu");
const Location = require("./Location");

async function sandbox() {
  await setupDb();
  const mcdonalds = await Company.create({
    name: "McDonald's",
    logoUrl:
      "https://upload.wikimedia.org/wikipedia/commons/thumb/3/36/McDonald%27s_Golden_Arches.svg/2339px-McDonald%27s_Golden_Arches.svg.png",
  });

  const kfc = await Company.create({
    name: "KFC",
    logoUrl: "https://1000logos.net/wp-content/uploads/2017/03/Kfc_logo.png",
  });

  // Create a menu for each restaurant
  const mcdonaldsDrinks = await mcdonalds.createMenu({
    title: "Drinks",
  });

  const mcdonaldsDesserts = await mcdonalds.createMenu({
    title: "Desserts",
  });

  const kfcStarters = await kfc.createMenu({
    title: "Starters",
  });

  const mcdonaldsLondon = await mcdonalds.createLocation({
    name: "London",
    capacity: 50,
    manager: "Jack",
  });
}

module.exports = sandbox;
