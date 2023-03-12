import "./dom";
import { DOMSelectors } from "./dom";
import "../styles/style.css";
import { monkeyArray } from "./array";
import "./array";

let cards = document.querySelectorAll(".card"),
  selected = [],
  time = 3,
  score = 0;
let interval;

function start() {
  DOMSelectors.start.style.display = "none";
  DOMSelectors.example.style.display = "none";
  DOMSelectors.timerBox.innerHTML = "<p class='timer'>1:00</p>";
  DOMSelectors.scoreParent.innerHTML = "<p class='score'> Score: 0/15 </p>";
  interval = setInterval(timer, 1000);
  shuffle();
  timer();
  grid();
}

document.querySelector(".start").addEventListener("click", start);

function restart() {
  time = 60;
  score = 0;
  DOMSelectors.display.innerHTML = "";
  DOMSelectors.popup.innerHTML = ``;
  DOMSelectors.timerBox.innerHTML = "<p class='timer'>1:00</p>";
  DOMSelectors.scoreParent.innerHTML = "<p class='score'> Score: 0/15 </p>";
  shuffle();
  grid();
}

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

function grid() {
  const cardCount = 30;
  const blackImg = "../imgs/black.avif";
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
    `<h2> Congratulations!</h2> <p> You have won the game!</p> <p> Score: 15/15 </p> <p> Time Left: ${time}s </p> <button class="home"><i class="fa fa-home"></i>Home</button> <button class="restart"> Play Again <i class="fa fa-trash"></i></button>`
  );
  home();
  document.querySelector(".restart").addEventListener("click", function () {
    restart();
  });
}

function losePopup() {
  DOMSelectors.popup.insertAdjacentHTML(
    "afterbegin",
    `<h2> Time's Up!</h2> <p> You have lost the game!</p> <p> Score: ${score}/15 </p> <p> Time Left: 0s </p> <button class="home">Home <i class="fa fa-home"></i></button> <button class="restart"> Play Again <i class="fa fa-refresh"></i></button>`
  );
  home();
  document.querySelector(".restart").addEventListener("click", function () {
    restart();
  });
}

function home() {
  document.querySelector(".home").addEventListener("click", function () {
    location.reload();
    // DOMSelectors.display.innerHTML = ``;
    // DOMSelectors.popup.innerHTML = ``;
    // DOMSelectors.start.style.display = "block";
    // DOMSelectors.example.style.display = "block";
  });
}
//css (flipcard, remove card) keep cards in same position even after others get removed, move time and score to the top, give the example at the beginning
//big algorithmt that calls two functions with parameters
//css so when popup shows up, u cant clikc anything outisde of it and u cant clikc outta it
//restart and home button
