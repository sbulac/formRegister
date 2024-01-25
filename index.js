const express = require("express");
const postUser = require("./middlewares/postUser");
const getOneUser = require("./middlewares/getOneUser");
const editUser = require("./middlewares/editUser");
const bodyParser = require("body-parser");
const fs = require("fs/promises");

const app = express();
app.use(bodyParser.json());

let arr;

const writeAsyncFile = async (path) => {
  const jsonUsers = JSON.stringify(arr);
  fs.writeFile(path, jsonUsers, "utf-8");
};

const readAsyncFile = async (path) => {
  try {
    const file = await fs.readFile(path, { encoding: "utf-8", flag: "r" });
    arr = JSON.parse(file);
  } catch (error) {
    console.error(error);
  }
};

readAsyncFile("./users.json")

app.get("/", (req, res) => {
  res.json(arr);
});

app.get("/:id", getOneUser, (req, res) => {
  res.json(arr[req.params.id-1]);
});

app.post("/", postUser, (req, res) => {
  arr.push(req.body);
  writeAsyncFile("./users.json");
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

  writeAsyncFile("./users.json");
  res.json(arr)
});

app.delete("/:id", (req, res) => {
  arr.splice(req.params.id - 1, 1);
  res.json(arr);
});

app.listen(3000, () => {
  console.log("Listen on port 3000");
});
