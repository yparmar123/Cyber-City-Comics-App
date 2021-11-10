const { response } = require("express");
var express = require("express");
const fetch = require("node-fetch");
var router = express.Router();

// home route
// Accepts comic number parameter, can view comic based off comicNo
router.get("/:comicNo?", function (req, res, next) {
  const comicNo =
    typeof parseInt(req.params.comicNo) === "number" ? req.params.comicNo : 0;
  res.render("comics/comic", {
    title: "Cyber City Comics - Home Page",
    comicNo: comicNo,
  });
});

// xkcd latest comic api call
router.post("/comic", async (req, res, next) => {
  const api_url = `https://xkcd.com/info.0.json`;
  const fetch_response = await fetch(api_url);
  const json = await fetch_response.json();
  res.json(json);
});

// xkcd comic based off comic number api call
router.post("/comic/:comicNo", async (req, res, next) => {
  const comicNo = req.params.comicNo;
  const api_url = `https://xkcd.com/${comicNo}/info.0.json`;
  const fetch_response = await fetch(api_url);
  const json = await fetch_response.json();
  res.json(json);
});

module.exports = router;
