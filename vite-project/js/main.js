import "./dom";
import { DOMSelectors } from "./dom";
import "../styles/style.css";
import { monkeyArray } from "./array";
import "./array";

let cards = document.querySelectorAll(".card"),
  selected = [],
  time = 60,
  cardCount = ``,
  score = 0;
let interval;

DOMSelectors.easy.addEventListener("click", function () {
  grid("Easy");
});

DOMSelectors.medium.addEventListener("click", function () {
  grid("Medium");
});

DOMSelectors.hard.addEventListener("click", function () {
  grid("Hard");
});

function timer() {
  let minutes = Math.floor(time / 60);
  let seconds = time % 60;
  if (seconds < 10) {
    seconds = "0" + seconds;
  } else {
    seconds = time % 60;
  }
  DOMSelectors.timerBox.innerHTML = `${minutes}m:${seconds}s`;
  time--;
  if (time < 0) {
    clearInterval(interval);
  }
  if (time === -1) {
    losePopup();
  }
}

function grid(mode) {
  const blackImg = "../imgs/black.avif";
  switch (mode) {
    case "Easy":
      cardCount = 10;
      break;
    case "Medium":
      cardCount = 20;
      break;
    case "Hard":
      cardCount = 30;
      break;
    default:
      cardCount = 30;
  }
  for (let i = 0; i < cardCount; i++) {
    let monkeyImg =
      monkeyArray[Math.floor(Math.random() * (monkeyArray.length - 1))];
    DOMSelectors.display.insertAdjacentHTML(
      "afterbegin",
      `<img class="card" src="${blackImg}" id="${monkeyImg}"/>`
    );
    monkeyArray.splice(monkeyArray.indexOf(monkeyImg), 1);
  }
  cards = document.querySelectorAll(".card");
  cards.forEach((card) => {
    card.addEventListener("click", flipCard);
  });
  DOMSelectors.starting.remove();
  DOMSelectors.timerBox.innerHTML = "<p class='timer'>1:00</p>";
  DOMSelectors.scoreParent.innerHTML = "<p class='score'> Score: 0/15 </p>";
  interval = setInterval(timer, 1000);
  shuffle();
  timer();
  DOMSelectors.homeInGame.insertAdjacentHTML(
    "afterbegin",
    `<button class="homeInGame">Home <i class="fa fa-home"></i></button>`
  );
  document.querySelector(".homeInGame").addEventListener("click", function () {
    location.reload();
  });
}

function shuffle() {
  monkeyArray.sort(() => 0.5 - Math.random());
}

function flipCard(event) {
  const img = event.target;
  img.src = img.id;
  const card = { src: img.id, element: img };
  selected.push(card);
  card.element.removeEventListener("click", flipCard);
  if (selected.length === 2) {
    cards.forEach((card) => {
      card.removeEventListener("click", flipCard);
    });
    setTimeout(check, 500);
  }
}

function check() {
  let firstImg = selected[0].src;
  let secondImg = selected[1].src;
  if (firstImg === secondImg) {
    score++;
    DOMSelectors.scoreParent.innerHTML = `Score: ${score}/15`;
    selected[0].element.remove();
    selected[1].element.remove();
    if (score === 15) {
      winPopup();
    }
  } else {
    selected.forEach((card) => {
      card.element.src = `../imgs/black.avif`;
      card.element.addEventListener("click", flipCard);
    });
  }
  selected = [];
  cards.forEach((card) => {
    card.addEventListener("click", flipCard);
  });
}

function winPopup() {
  DOMSelectors.popup.insertAdjacentHTML(
    "afterbegin",
    `<h2> Congratulations!</h2> <p> You have won the game!</p> <p> Score: 15/15 </p> <p> Time Left: ${time}s </p> <button class="home"><i class="fa fa-home"></i>Home</button> `
  );
  home();
  document.querySelector(".homeInGame").remove();
}

function losePopup() {
  DOMSelectors.popup.insertAdjacentHTML(
    "afterbegin",
    `<h2> Time's Up!</h2> <p> You have lost the game!</p> <p> Score: ${score}/15 </p> <p> Time Left: 0s </p> <button class="home">Home <i class="fa fa-home"></i></button>`
  );
  home();
  document.querySelector(".homeInGame").remove();
}

function home() {
  document.querySelector(".home").addEventListener("click", function () {
    location.reload();
  });
}
//css (flipcard, remove card) keep cards in same position even after others get removed, move time and score to the top, give the example at the beginning
//css popup
// add comments to code for functionally
