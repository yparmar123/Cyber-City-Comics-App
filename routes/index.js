const { response } = require("express");
var express = require("express");
const fetch = require("node-fetch");

const viewDB = require("../model/viewsDB");
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

router.post("/viewedcomic/:comicNo", (req, res, next) => {
  const comicNo = req.params.comicNo;
  const viewedDB = viewDB.ViewsDB;
  let index = viewedDB
    .map((e) => {
      return e.comicNo;
    })
    .indexOf(comicNo);
  if (index !== -1) {
    viewedDB[index].count += 1;
  } else {
    viewedDB.push({
      count: 1,
      comicNo: comicNo,
    });
    index = index !== -1 ? index : viewedDB.length - 1;
  }
  res.status(200).send(JSON.stringify(viewedDB[index]));
});

module.exports = router;
