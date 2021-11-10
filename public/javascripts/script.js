let currentComic = {};
let maxComicNo;
let img = document.querySelector("#comic");
let date = document.querySelector("#date");
let next = document.querySelector("#next");
let previous = document.querySelector("#previous");
let comicNo = document.querySelector("#comic-number");
let transcript = document.querySelector("#transcript");
let title = document.querySelector("#title");
let random = document.querySelector("#random");

const fetchComic = (comicNum) => {
  fetch(`/comic/${comicNum}`)
    .then((res) => {
      res.json().then((data) => {
        currentComic = data;
        console.log(currentComic);
        img.setAttribute("src", currentComic.img);
        comicNo.setAttribute("value", currentComic.num);
        title.innerHTML = `${currentComic.safe_title}`;
        date.innerHTML = `${currentComic.month}-${currentComic.day}-${currentComic.year}`;
        transcript.innerHTML = `${currentComic.alt}`;
        next.addEventListener("click", nextComic);
        previous.addEventListener("click", previousComic);
        if (comicNum === "") {
          maxComicNo = currentComic.num;
          random.addEventListener("click", randomComic);
        }

        if (maxComicNo === currentComic.num) {
          previous.disabled = true;
        } else {
          previous.disabled = false;
        }

        if (currentComic.num === 1) {
          next.disabled = true;
        } else {
          next.disabled = false;
        }
      });
    })
    .catch((err) => {
      console.log(err);
    });
};

const loadHomePage = () => {
  fetchComic("");
};

const loadComic = (comicNum) => {
  fetchComic(comicNum);
};

const previousComic = () => {
  fetchComic(currentComic.num + 1);
};

const nextComic = () => {
  fetchComic(currentComic.num - 1);
};

const randomComic = () => {
  fetchComic(Math.floor(Math.random() * maxComicNo));
};

window.onload = function () {
  loadHomePage();
};
