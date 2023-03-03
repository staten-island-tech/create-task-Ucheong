import "./dom";
import { DOMSelectors } from "./dom";
import "../styles/style.css";
import { array } from "./array";
import "./array";

document.querySelector(".start").addEventListener("click", function () {
  DOMSelectors.start.remove();
  DOMSelectors.gridbefore.remove();
  DOMSelectors.timerbox.insertAdjacentHTML(
    "afterbegin",
    `<p class="timer">1:00</p>`
  );
  DOMSelectors.display.insertAdjacentHTML(
    "afterbegin",
    `<p class="score'> Score: </p>`
  );
  setInterval(timer, 1000);
  timer();
  grid();
});

// function board() {}

let time = 60;

function timer() {
  let minutes = Math.floor(time / 60);
  let seconds = time % 60;
  if (seconds < 10) {
    seconds = "0" + seconds;
  } else {
    seconds = time % 60;
  }
  DOMSelectors.timerbox.innerHTML = `${minutes}:${seconds}`;
  time--;
}

array.sort(() => 0.5 - Math.random());

function gridbefore() {
  const cardCount = 30;
  for (let i = 0; i < cardCount; i++) {
    DOMSelectors.display.insertAdjacentHTML(
      "afterbegin",
      `<img class="default" src="../imgs/black.avif" alt="The Color Black" />`
    );
  }
  const card = document.createElement(`img`);
  card.setAttribute(`data-id`, i);
  card.addEventListener(`click`, flipcard);
}
gridbefore();

function grid() {
  const cardCount = 30;
  for (let i = 0; i < cardCount; i++) {
    DOMSelectors.grid.insertAdjacentHTML(
      "afterbegin",
      `<img class="default" src="../imgs/black.avif" alt="The Color Black" />`
    );
  }
}

function flipcard() {
  //update score +1 x/15
}

// function check() {}

// <button class="home"><i class="fa fa-home"></i></button>
