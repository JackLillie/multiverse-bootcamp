const sequelize = require("./db");
const Company = require("./Company");
const Menu = require("./Menu");
const Location = require("./Location");
const setupDb = require("./setupDb");
const express = require("express");

const app = express();

app.use(express.urlencoded({ extended: true }));
app.use(express.json());

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
}

function checkIdValid(id, res) {
  if (isNaN(id)) {
    res.status(400).send({
      message: "id must be a number",
    });
  } else if (id < 1) {
    res.status(400).send({
      message: "id must be greated than 0",
    });
  }
}

function checkCompanyExists(company, id, res) {
  if (company === null) {
    res.status(404).send({
      message: `Company with id '${id}' not found`,
    });
    return false;
  }
  return true;
}

function checkMenuExists(menu, id, res) {
  if (menu === null) {
    res.status(404).send({
      message: `Menu with id '${id}' not found`,
    });
    return false;
  }
  return true;
}

function checkLocationExists(location, id, res) {
  if (location === null) {
    res.status(404).send({
      message: `Location with id '${id}' not found`,
    });
    return false;
  }
  return true;
}

sandbox();

//Get all the companies
app.get("/companies", async (req, res) => {
  const companies = await Company.findAll();
  if (companies === null) {
    res.status(404).send({
      message: `No companies found`,
    });
  }
  res.json(companies);
});

//Get a specific company by its id
app.get("/companies/:id", async (req, res) => {
  checkIdValid(req.params.id, res);
  const company = await Company.findByPk(req.params.id);
  if (checkCompanyExists(company, req.params.id, res)) {
    res.json(company);
  }
});

//Get all a company's menus
app.get("/companies/:id/menus", async (req, res) => {
  checkIdValid(req.params.id, res);
  const company = await Company.findByPk(req.params.id);
  if (checkCompanyExists(company, req.params.id, res)) {
    const menus = await company.getMenus();
    if (menus === null) {
      res.status(404).send({
        message: `No menus available for company with id '${req.params.id}'`,
      });
    } else {
      res.json(menus);
    }
  }
});

//Create a new company
app.post("/companies", async (req, res) => {
  if (!req.body.name || !req.body.logoUrl) {
    res.status(400).send({
      message: `Please pass a valid name and logoUrl`,
    });
  }
  await Company.create({
    name: req.body.name,
    logoUrl: req.body.logoUrl,
  });
  res.send({ message: "Company created successfully" });
});

//Delete a company
app.delete("/companies/:id", async (req, res) => {
  checkIdValid(req.params.id, res);
  const company = await Company.findByPk(req.params.id);
  if (checkCompanyExists(company, req.params.id, res)) {
    //Delete all companies' menus
    Menu.destroy({
      where: {
        companyId: req.params.id,
      },
    });
    //Delete all companies' locations
    Location.destroy({
      where: {
        companyId: req.params.id,
      },
    });
    company.destroy();
    res.send({ message: "Company deleted successfully" });
  }
});

//Get a specific menu by its id
app.get("/menus/:id", async (req, res) => {
  checkIdValid(req.params.id, res);
  const menu = await Menu.findByPk(req.params.id);
  if (checkMenuExists(menu, req.params.id, res)) {
    res.json(menu);
  }
});

//Replace a specific company
app.put("/companies/:id", async (req, res) => {
  checkIdValid(req.params.id);
  if (!req.body.name || !req.body.logoUrl) {
    res.status(400).send({
      message: `Please pass a valid name and logoUrl`,
    });
  }
  const company = await Company.findByPk(req.params.id);
  company.update({ name: req.body.name, logoUrl: req.body.logoUrl });
  res.send({ message: "Company updated successfully" });
});

// Create a new menu
app.post("/menus", async (req, res) => {
  if (!req.body.title || !req.body.companyId) {
    res.status(400).send({
      message: `Please pass a valid title and companyId`,
    });
  }
  const company = await Company.findByPk(req.params.id);
  if (checkCompanyExists(company, req.params.id, res)) {
    await Menu.create({
      title: req.body.title,
      companyId: req.body.companyId,
    });
    res.send({ message: "Menu created successfully" });
  }
});

// Delete a menu
app.delete("/menus/:id", async (req, res) => {
  checkIdValid(req.params.id, res);
  const menu = await Menu.findByPk(req.params.id);
  if (checkMenuExists(menu, req.params.id, res)) {
    //Delete menu
    menu.destroy();
    res.send({ message: "Menu deleted successfully" });
  }
});

//Create a new location
app.post("/locations", async (req, res) => {
  if (
    !req.body.name ||
    !req.body.capacity ||
    !req.body.manager ||
    !req.body.companyId
  ) {
    res.status(400).send({
      message: `Please pass a valid name, capacity, manager, and companyId`,
    });
  }
  const company = await Company.findByPk(req.body.companyId);
  if (checkCompanyExists(company, req.body.id, res)) {
    await Location.create({
      name: req.body.name,
      capacity: req.body.capacity,
      manager: req.body.manager,
      companyId: req.body.companyId,
    });
    res.send({ message: "Location created successfully" });
  }
});

// Delete a location
app.delete("/locations/:id", async (req, res) => {
  checkIdValid(req.params.id, res);
  const location = await Location.findByPk(req.params.id);
  if (checkLocationExists(location, req.params.id, res)) {
    //Delete menu
    location.destroy();
    res.send({ message: "Location deleted successfully" });
  }
});

app.listen(3000, () => {
  console.log("Listening on port 3000");
});
