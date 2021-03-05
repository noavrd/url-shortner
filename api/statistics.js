const express = require("express");
const DataBase = require("../dataBase.js");

const router = express.Router();
router.use(express.json());
router.use(express.urlencoded());

//let table = document.querySelector("table");

router.get("/", (req, res) => {
    try {
      res.sendFile(__dirname + "/views/statistics.html");
    } catch {
      res.status(404).send("page not found");
    }
  });

  module.exports = { router };
