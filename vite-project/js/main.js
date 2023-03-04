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

function gridbefore() {
  const cardCount = 30;
  for (let i = 0; i < cardCount; i++) {
    DOMSelectors.display.insertAdjacentHTML(
      "afterbegin",
      `<div class="default">
      <img src="../imgs/black.avif" alt="The Color Black"/>
      </div>`
    );
  }
}
gridbefore();

function grid() {
  array.map((card) => {
    card.addEventListener(`click`, () => {
      array.sort(() => 0.5 - Math.random());
      let image = card.image;
      console.log(array);
      DOMSelectors.grid.insertAdjacentHTML(
        "afterbegin",
        `<div class="default">
        <img src="../imgs/black.avif" alt="The Color Black"/>
        </div>
        <div class="monkey"> <img src="{image}"> </div>`
      );
    });
  });

  // for (let i = 0; i < cardCount; i++) {
  //   const card = document.createElement(`img`);
  //   card.setAttribute(`data-id`, i);
  //   card.addEventListener(`click`, flipcard);
}

function flipcard() {
  //update score +1 x/15
}

function check() {}

function popup() {}

// <button class="home"><i class="fa fa-home"></i></button>
