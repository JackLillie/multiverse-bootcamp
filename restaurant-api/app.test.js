const app = require("./app");
const request = require("supertest");
const setupDb = require("./setupDb");
const Company = require("./Company");
const Menu = require("./Menu");
const Location = require("./Location");

beforeAll(async () => {
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
});

describe("GET /companies", () => {
  test("GET /companies works", () => {
    return request(app)
      .get("/companies")
      .then((response) => {
        expect(response.statusCode).toBe(200);
      });
  });
});

describe("GET /companies/:id", () => {
  test("GET /companies/:id with valid id", () => {
    return request(app)
      .get("/companies/1")
      .then((response) => {
        expect(response.statusCode).toBe(200);
      });
  });

  test("GET /companies/:id with negative id", () => {
    return request(app)
      .get("/companies/-1")
      .then((response) => {
        expect(response.statusCode).toBe(400);
      });
  });

  test("GET /companies/:id with double", () => {
    return request(app)
      .get("/companies/2.5")
      .then((response) => {
        expect(response.statusCode).toBe(400);
      });
  });

  test("GET /companies/:id with string", () => {
    return request(app)
      .get("/companies/asd")
      .then((response) => {
        expect(response.statusCode).toBe(400);
      });
  });
});

describe("GET /companies/:id/menus", () => {
  test("GET /companies/:id/menus with valid input", () => {
    return request(app)
      .get("/companies/1/menus")
      .then((response) => {
        expect(response.statusCode).toBe(200);
      });
  });

  test("GET /companies/:id/menus with negative number", () => {
    return request(app)
      .get("/companies/-41/menus")
      .then((response) => {
        expect(response.statusCode).toBe(400);
      });
  });

  test("GET /companies/:id/menus with double", () => {
    return request(app)
      .get("/companies/2.5/menus")
      .then((response) => {
        expect(response.statusCode).toBe(400);
      });
  });

  test("GET /companies/:id/menus with string", () => {
    return request(app)
      .get("/companies/asd/menus")
      .then((response) => {
        expect(response.statusCode).toBe(400);
      });
  });
});

describe("POST /companies", () => {
  test("POST /companies with valid input", () => {
    return request(app)
      .post("/companies")
      .send({
        name: "Nando's",
        logoUrl:
          "https://centaur-wp.s3.eu-central-1.amazonaws.com/designweek/prod/content/uploads/2016/01/22083950/logo-1002x596.jpg",
      })
      .then((response) => {
        expect(response.statusCode).toBe(200);
      });
  });

  test("POST /companies with invalid url", () => {
    return request(app)
      .post("/companies")
      .send({
        name: "Nando's",
        logoUrl: "some url",
      })
      .then((response) => {
        expect(response.statusCode).toBe(400);
      });
  });

  test("POST /companies with no name", () => {
    return request(app)
      .post("/companies")
      .send({
        name: "",
        logoUrl:
          "https://centaur-wp.s3.eu-central-1.amazonaws.com/designweek/prod/content/uploads/2016/01/22083950/logo-1002x596.jpg",
      })
      .then((response) => {
        expect(response.statusCode).toBe(400);
      });
  });
});
describe("DELETE /companies/:id", () => {
  test("DELETE /companies with valid id", () => {
    return request(app)
      .delete("/companies/1")
      .then((response) => {
        expect(response.statusCode).toBe(200);
      });
  });
  test("DELETE /companies with negative id", () => {
    return request(app)
      .delete("/companies/-1")
      .then((response) => {
        expect(response.statusCode).toBe(400);
      });
  });

  test("DELETE /companies with double", () => {
    return request(app)
      .delete("/companies/2.5")
      .then((response) => {
        expect(response.statusCode).toBe(400);
      });
  });

  test("DELETE /companies with string", () => {
    return request(app)
      .delete("/companies/asd")
      .then((response) => {
        expect(response.statusCode).toBe(400);
      });
  });
});
describe("PUT /companies/:id", () => {});
