import "./dom";
import { DOMSelectors } from "./dom";
import "../styles/style.css";
import { monkeyArray } from "./array";
import "./array";

let cards = document.querySelectorAll(".card"),
  selected = [],
  time = 60,
  score = 0;

function restart() {
  DOMSelectors.timerBox.innerHTML = "<p class='timer'>1:00</p>";
  DOMSelectors.scoreParent.innerHTML = "<p class='score'> Score: 0/15 </p>";
  setInterval(timer, 1000);
  shuffle();
  timer();
  grid();
}
document.querySelector(".start").addEventListener("click", function start() {
  DOMSelectors.start.style.display = "none";
  restart();
  // DOMSelectors.display.insertAdjacentHTML(
  //   "afterbegin",
  //   `<button class="restart"></button>`
  // );
  // document.querySelector(".restart").addEventListener("click", function () {
  //   start();
  // });
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
  if (time === 0) {
    let timeInterval;
    clearInterval(timeInterval);
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
    `<h2> Congratulations!</h2> <p> You have won the game!</p> <p> Score: 15/15 </p> <p> Time Left: ${time}s </p> <button class="home"><i class="fa fa-home"></i></button> <button class="restart"></button>`
  );
  document.querySelector(".home").addEventListener("click", function () {
    DOMSelectors.display.innerHTML = ``;
    DOMSelectors.popup.innerHTML = ``;
    DOMSelectors.start.style.display = "block";
  });
  document.querySelector(".restart").addEventListener("click", function () {
    DOMSelectors.display.innerHTML = ``;
    restart();
  });
}

function losePopup() {
  DOMSelectors.popup.insertAdjacentHTML(
    "afterbegin",
    `<h2> Time's Up!</h2> <p> You have lost the game!</p> <p> Score: ${score}/15 </p> <p> Time Left: 0s </p> <button class="home"><i class="fa fa-home"></i></button> <button class="restart"> Play Again</button>`
  );
  document.querySelector(".home").addEventListener("click", function () {
    DOMSelectors.display.innerHTML = ``;
    DOMSelectors.popup.innerHTML = ``;
    DOMSelectors.start.style.display = "block";
  });
  document.querySelector(".restart").addEventListener("click", function () {
    DOMSelectors.display.innerHTML = ``;
    restart();
  });
}

//css (flipcard, remove card) keep cards in same position even after others get removed, move time and score to the top, give the example at the beginning
//big algorithmt that calls two functions with parameters
//css so when popup shows up, u cant clikc anything outisde of it and u cant clikc outta it
