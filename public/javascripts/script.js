// Current comic and maximum comic number value
let currentComic = {};
let maxComicNo;

// Html elements
let img = document.querySelector("#comic");
let date = document.querySelector("#date");
let next = document.querySelector("#next");
let previous = document.querySelector("#previous");
let comicNo = document.querySelector("#comic-number");
let transcript = document.querySelector("#transcript");
let title = document.querySelector("#title");
let random = document.querySelector("#random");
let param = document.querySelector("#param");
let logo = document.querySelector("#logo");

const fetchComic = (comicNum) => {
  fetch(`/comic/${comicNum}`, { method: "POST" })
    .then((res) => {
      res.json().then((data) => {
        currentComic = data;
        setComic(currentComic, comicNum);
      });
    })
    .catch((err) => {
      console.log(err);
    });
};

// Sets comic values into page
const setComic = (comic, comicNum) => {
  img.setAttribute("src", comic.img);
  comicNo.setAttribute("value", comic.num);
  title.innerHTML = `${comic.safe_title}`;
  date.innerHTML = `Published: ${comic.month}-${comic.day}-${comic.year}`;
  transcript.innerHTML = `${comic.alt}`;

  // Next and previous button event listeners
  next.addEventListener("click", nextComic);
  previous.addEventListener("click", previousComic);

  // Search bar event listener
  comicNo.addEventListener("keypress", (e) => {
    if (e.key === "Enter") {
      loadComic(comicNo.value);
    }
  });

  // if default value is selected or navigated to, maximum comic number is set
  if (comicNum === "") {
    maxComicNo = comic.num;
    random.addEventListener("click", randomComic);
  }

  // previous button is disabled if currently on the latest comic
  if (maxComicNo === comic.num) {
    previous.disabled = true;
  } else {
    previous.disabled = false;
  }

  // next button is disabled if on the last comic
  if (comic.num === 1) {
    next.disabled = true;
  } else {
    next.disabled = false;
  }
};

// Loads default home page
const loadHomePage = () => {
  fetchComic("");
};

// Loads page based off comic number
const loadComic = (comicNum) => {
  fetchComic(comicNum);
};

// Previous button event function
const previousComic = () => {
  fetchComic(currentComic.num + 1);
};

// Next button event function
const nextComic = () => {
  fetchComic(currentComic.num - 1);
};

// Random button even function
const randomComic = () => {
  fetchComic(Math.floor(Math.random() * maxComicNo));
};

logo.addEventListener("click", loadHomePage);

window.onload = function () {
  if (param.value !== "0") {
    loadComic(param.value);
  } else {
    loadHomePage();
  }
};
