const app = require("./app");
const request = require("supertest");
const sandbox = require("./sandbox");

beforeEach(async () => {
  await sandbox();
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

describe("PUT /companies/:id", () => {
  test("PUT /companies/:id with valid input", () => {
    return request(app)
      .put("/companies/1")
      .send({
        name: "Wetherspoons",
        logoUrl: "https://www.jdwetherspoon.com/Assets/Images/orderandpay.png",
      })
      .then((response) => {
        expect(response.statusCode).toBe(200);
      });
  });

  test("PUT /companies/:id with invalid id", () => {
    return request(app)
      .put("/companies/-1")
      .send({
        name: "Wetherspoons",
        logoUrl: "https://www.jdwetherspoon.com/Assets/Images/orderandpay.png",
      })
      .then((response) => {
        expect(response.statusCode).toBe(400);
      });
  });

  test("PUT /companies/:id with id of company that doesn't exist", () => {
    return request(app)
      .put("/companies/100")
      .send({
        name: "Wetherspoons",
        logoUrl: "https://www.jdwetherspoon.com/Assets/Images/orderandpay.png",
      })
      .then((response) => {
        expect(response.statusCode).toBe(404);
      });
  });
});

describe("GET /menus/:id", () => {
  test("GET /menus/:id with valid input", () => {
    return request(app)
      .get("/menus/1")
      .then((response) => {
        expect(response.statusCode).toBe(200);
      });
  });

  test("GET /menus/:id with negative number", () => {
    return request(app)
      .get("/menus/-41")
      .then((response) => {
        expect(response.statusCode).toBe(400);
      });
  });

  test("GET /menus/:id with double", () => {
    return request(app)
      .get("/menus/2.5")
      .then((response) => {
        expect(response.statusCode).toBe(400);
      });
  });

  test("GET /menus/:id with string", () => {
    return request(app)
      .get("/menus/asd")
      .then((response) => {
        expect(response.statusCode).toBe(400);
      });
  });
});

describe("POST /menus", () => {
  test("POST /menus with valid input", () => {
    return request(app)
      .post("/menus")
      .send({
        companyId: "1",
        title: "Mains",
      })
      .then((response) => {
        expect(response.statusCode).toBe(200);
      });
  });

  test("POST /menus with invalid companyId", () => {
    return request(app)
      .post("/menus")
      .send({
        companyId: "-1",
        title: "Mains",
      })
      .then((response) => {
        expect(response.statusCode).toBe(400);
      });
  });

  test("POST /menus with no title", () => {
    return request(app)
      .post("/companies")
      .send({
        companyId: "1",
        title: "",
      })
      .then((response) => {
        expect(response.statusCode).toBe(400);
      });
  });
});

describe("DELETE /menus/:id", () => {
  test("DELETE /menus with valid id", () => {
    return request(app)
      .delete("/menus/1")
      .then((response) => {
        expect(response.statusCode).toBe(200);
      });
  });
  test("DELETE /menus with negative id", () => {
    return request(app)
      .delete("/menus/-1")
      .then((response) => {
        expect(response.statusCode).toBe(400);
      });
  });

  test("DELETE /menus with double", () => {
    return request(app)
      .delete("/menus/2.5")
      .then((response) => {
        expect(response.statusCode).toBe(400);
      });
  });

  test("DELETE /menus with string", () => {
    return request(app)
      .delete("/menus/asd")
      .then((response) => {
        expect(response.statusCode).toBe(400);
      });
  });
});

describe("POST /locations", () => {
  test("POST /locations with valid input", () => {
    return request(app)
      .post("/locations")
      .send({
        name: "London",
        capacity: 50,
        manager: "Jack",
        companyId: 1,
      })
      .then((response) => {
        expect(response.statusCode).toBe(200);
      });
  });

  test("POST /locations with invalid companyId", () => {
    return request(app)
      .post("/locations")
      .send({
        name: "London",
        capacity: 50,
        manager: "Jack",
        companyId: -1,
      })
      .then((response) => {
        expect(response.statusCode).toBe(400);
      });
  });

  test("POST /locations with no name", () => {
    return request(app)
      .post("/locations")
      .send({
        name: "",
        capacity: 50,
        manager: "Jack",
        companyId: 1,
      })
      .then((response) => {
        expect(response.statusCode).toBe(400);
      });
  });
});

describe("DELETE /locations/:id", () => {
  test("DELETE /locations with valid id", () => {
    return request(app)
      .delete("/locations/1")
      .then((response) => {
        expect(response.statusCode).toBe(200);
      });
  });

  test("DELETE /locations with negative id", () => {
    return request(app)
      .delete("/locations/-1")
      .then((response) => {
        expect(response.statusCode).toBe(400);
      });
  });

  test("DELETE /locations with double", () => {
    return request(app)
      .delete("/locations/2.5")
      .then((response) => {
        expect(response.statusCode).toBe(400);
      });
  });

  test("DELETE /locations with string", () => {
    return request(app)
      .delete("/locations/asd")
      .then((response) => {
        expect(response.statusCode).toBe(400);
      });
  });
});
