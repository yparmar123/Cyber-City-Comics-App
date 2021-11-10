const { response } = require("express");
var express = require("express");
const fetch = require("node-fetch");
var router = express.Router();

/* GET home page. */
router.get("/", function (req, res, next) {
  res.render("comics/comic", {
    title: "Cyber City Comics - Home Page",
  });
});

router.get("/comic", async (req, res, next) => {
  const api_url = `https://xkcd.com/info.0.json`;
  const fetch_response = await fetch(api_url);
  const json = await fetch_response.json();
  res.json(json);
});

router.get("/comic/:comicNo", async (req, res, next) => {
  const comicNo = req.params.comicNo;
  const api_url = `https://xkcd.com/${comicNo}/info.0.json`;
  const fetch_response = await fetch(api_url);
  const json = await fetch_response.json();
  res.json(json);
});

module.exports = router;
