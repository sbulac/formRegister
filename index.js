const express = require("express");
const bodyParser = require("body-parser");
const portUser = require("./middlewares/postUser");
const getOneUser = require("./middlewares/getOneUser");
const editUser = require("./middlewares/editUser");

const app = express();
app.use(bodyParser.json());

let arr = [];

app.get("/", (req, res) => {
  res.json(arr);
});

app.get("/:id", getOneUser, (req, res) => {
  res.json(arr[req.params.id]);
});

app.post("/", portUser, (req, res) => {
  arr.push(req.body);
  res.json(arr);
});

app.patch("/:id", editUser, (req, res) => {
  const { body } = req;
  if (body?.name) {
    arr[req.params.id - 1].name = body.name;
  }
  if (body?.lastName) {
    arr[req.params.id - 1].lastName = body.lastName;
  }
  if (body?.number) {
    arr[req.params.id - 1].number = body.number;
  }
  if (body?.email) {
    arr[req.params.id - 1].email = body.email;
  }
});

app.delete("/:id", (req, res) => {
  arr.splice(req.params.id - 1, 1);
  res.json(arr);
});

app.listen(3001, () => {
  console.log("Listen on port 3001");
});
