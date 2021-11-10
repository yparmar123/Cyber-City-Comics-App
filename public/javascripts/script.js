let currentComic = {};
let page = 1;
let img = document.querySelector("#comic");

const loadComicData = () => {
  fetch("comic/500")
    .then((res) => {
      res.json().then((data) => {
        currentComic = data;
        img.setAttribute("src", currentComic.img);
      });
    })
    .catch((err) => {
      console.log(err);
    });
};

window.onload = function () {
  loadComicData();
};
