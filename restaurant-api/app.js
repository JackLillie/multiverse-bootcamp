const sequelize = require("./db");
const Company = require("./Company");
const Menu = require("./Menu");
const Location = require("./Location");
const express = require("express");
const sandbox = require("./sandbox");
const path = require("path");
const Handlebars = require("handlebars");
const expressHandlebars = require("express-handlebars");
const {
  allowInsecurePrototypeAccess,
} = require("@handlebars/allow-prototype-access");

const handlebars = expressHandlebars({
  handlebars: allowInsecurePrototypeAccess(Handlebars),
});

const app = express();

app.use(express.urlencoded({ extended: true }));
app.use(express.json());

app.engine("handlebars", handlebars);
app.set("view engine", "handlebars");
app.set("views", path.join(__dirname, "views"));
app.use(express.static(path.join(__dirname, "/public")));
app.use("/js", express.static(__dirname + "/public/js"));

sandbox();

function isValidHttpUrl(string) {
  let url;

  try {
    url = new URL(string);
  } catch (_) {
    return false;
  }

  return url.protocol === "http:" || url.protocol === "https:";
}

function checkIdValid(id, res) {
  if (isNaN(id) || !Number.isInteger(Number(id))) {
    res.status(400).send({
      message: "id must be an integer",
    });
  } else if (id < 1) {
    res.status(400).send({
      message: "id must be greated than 0",
    });
  } else {
    return true;
  }
}

function checkCompanyExists(company, id, res) {
  if (company === null) {
    res.status(404).send({
      message: `Company with id '${id}' not found`,
    });
  } else {
    return true;
  }
}

function checkMenuExists(menu, id, res) {
  if (menu === null) {
    res.status(404).send({
      message: `Menu with id '${id}' not found`,
    });
  } else {
    return true;
  }
}

function checkLocationExists(location, id, res) {
  if (location === null) {
    res.status(404).send({
      message: `Location with id '${id}' not found`,
    });
  } else {
    return true;
  }
}

app.get("/", async (req, res) => {
  const companies = await Company.findAll();
  res.render("home", { companies });
});

app.get("/companies/:id/info", async (req, res) => {
  if (checkIdValid(req.params.id, res)) {
    const company = await Company.findByPk(req.params.id);
    if (checkCompanyExists(company, req.params.id, res)) {
      const menus = await company.getMenus();
      const locations = await company.getLocations();
      res.render("info", { company, menus, locations });
    } else {
    }
  }
});

app.get("/addcompany", async (req, res) => {
  res.render("addcompany");
});

app.get("/addmenu", async (req, res) => {
  const companies = await Company.findAll();
  if (companies.length === 0 || companies === null) {
    res.status(404).send({
      message: `No companies found`,
    });
  }
  res.render("addmenu", { companies });
});

app.get("/addlocation", async (req, res) => {
  const companies = await Company.findAll();
  if (companies.length === 0 || companies === null) {
    res.status(404).send({
      message: `No companies found`,
    });
  }
  res.render("addlocation", { companies });
});

//Get all the companies
app.get("/companies", async (req, res) => {
  const companies = await Company.findAll();
  if (companies.length === 0 || companies === null) {
    res.status(404).send({
      message: `No companies found`,
    });
  }
  res.json(companies);
});

//Get a specific company by its id
app.get("/companies/:id", async (req, res) => {
  if (checkIdValid(req.params.id, res)) {
    const company = await Company.findByPk(req.params.id);
    if (checkCompanyExists(company, req.params.id, res)) {
      res.json(company);
    }
  }
});

//Get all a company's menus
app.get("/companies/:id/menus", async (req, res) => {
  if (checkIdValid(req.params.id, res)) {
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
  }
});

//Create a new company
app.post("/companies", async (req, res) => {
  if (
    !req.body.name ||
    !req.body.logoUrl ||
    !isValidHttpUrl(req.body.logoUrl)
  ) {
    res.status(400).send({
      message: `Please pass a valid name and logoUrl`,
    });
  } else {
    await Company.create({
      name: req.body.name,
      logoUrl: req.body.logoUrl,
    });
    res.redirect("/");
  }
});

//Delete a company
app.delete("/companies/:id", async (req, res) => {
  if (checkIdValid(req.params.id, res)) {
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
  }
});

//Replace a specific company
app.put("/companies/:id", async (req, res) => {
  if (checkIdValid(req.params.id, res)) {
    if (
      !req.body.name ||
      !req.body.logoUrl ||
      !isValidHttpUrl(req.body.logoUrl)
    ) {
      res.status(400).send({
        message: `Please pass a valid name and logoUrl`,
      });
    } else {
      const company = await Company.findByPk(req.params.id);
      if (checkCompanyExists(company, req.params.id, res)) {
        company.update({ name: req.body.name, logoUrl: req.body.logoUrl });
        res.send({ message: "Company updated successfully" });
      }
    }
  }
});

//Get a specific menu by its id
app.get("/menus/:id", async (req, res) => {
  if (checkIdValid(req.params.id, res)) {
    const menu = await Menu.findByPk(req.params.id);
    if (checkMenuExists(menu, req.params.id, res)) {
      res.json(menu);
    }
  }
});

// Create a new menu
app.post("/menus", async (req, res) => {
  if (checkIdValid(req.body.companyId, res)) {
    if (!req.body.title) {
      res.status(400).send({
        message: `Please pass a valid title`,
      });
    } else {
      const company = await Company.findByPk(req.body.companyId);
      if (checkCompanyExists(company, req.body.companyId, res)) {
        await Menu.create({
          title: req.body.title,
          companyId: req.body.companyId,
        });
        res.send({ message: "Menu created successfully" });
      }
    }
  }
});

// Delete a menu
app.delete("/menus/:id", async (req, res) => {
  if (checkIdValid(req.params.id, res)) {
    const menu = await Menu.findByPk(req.params.id);
    if (checkMenuExists(menu, req.params.id, res)) {
      //Delete menu
      menu.destroy();
      res.send({ message: "Menu deleted successfully" });
    }
  }
});

//Create a new location
app.post("/locations", async (req, res) => {
  if (checkIdValid(req.body.companyId, res)) {
    if (
      !req.body.name ||
      !req.body.capacity ||
      !req.body.manager ||
      !req.body.companyId
    ) {
      res.status(400).send({
        message: `Please pass a valid name, capacity, manager, and companyId`,
      });
    } else {
      const company = await Company.findByPk(req.body.companyId);
      if (checkCompanyExists(company, req.body.companyId, res)) {
        await Location.create({
          name: req.body.name,
          capacity: req.body.capacity,
          manager: req.body.manager,
          companyId: req.body.companyId,
        });
        res.send({ message: "Location created successfully" });
      }
    }
  }
});

// Delete a location
app.delete("/locations/:id", async (req, res) => {
  if (checkIdValid(req.params.id, res)) {
    const location = await Location.findByPk(req.params.id);
    if (checkLocationExists(location, req.params.id, res)) {
      //Delete location
      Location.destroy({
        where: {
          id: req.params.id,
        },
      });
      res.send({ message: "Location deleted successfully" });
    }
  }
});

module.exports = app;
