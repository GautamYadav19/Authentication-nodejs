const express = require("express");
const { async } = require("rxjs");
// const { async } = require("rxjs");
const db = require("../DB/db");
const { text } = require("body-parser");
const router = express.Router();


router.post("/login", async function (req, res, next) {
  try {
    let { username, password } = req.body;
    let results = await db.login(username, password);
    res.json(results);
  } catch (error) {
    res, send({ status: 0, error: error });
  }
});
router.get("/", async function (req, res, next) {
  try {
    
    
    res.json({text:"tettfs"});
  } catch (error) {
    res.send({ status: 0, error: error });
  }
});
module.exports = router;