const express = require("express");

const app = express();
const users = {};
let id = 1;

app.use(express.urlencoded({ extended: true }));
app.use(express.json());

app.post("/users", (req, res) => {
  if (typeof req.body.name === "undefined" || req.body.name === "") {
    return res.status(400).send({
      message: "Name must not be empty",
    });
  }
  if (typeof req.body.age === "undefined") {
    return res.status(400).send({
      message: "Age must not be empty",
    });
  }
  if (req.body.age < 0) {
    return res.status(400).send({
      message: "Age must be greater than or equal to 0",
    });
  }

  users[id] = {
    name: req.body.name,
    age: req.body.age,
  };

  id++;

  res.status(200).send({
    message: "User saved successfully",
  });
});

app.get("/users/:id", (req, res) => {
  if (users[req.params.id] === undefined) {
    res.status(404).send({
      message: "No users found for id: " + req.params.id,
    });
  } else {
    res.status(200).send({
      data: users[req.params.id],
    });
  }
});

app.listen(3000, () => {
  console.log("Listening on port 3000");
});
