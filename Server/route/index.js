const express = require("express");
const { async } = require("rxjs");
// const { async } = require("rxjs");
const db = require("../DB");
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
module.exports = router;