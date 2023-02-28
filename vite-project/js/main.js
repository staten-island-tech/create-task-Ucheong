import "./dom";
import { DOMSelectors } from "./dom";
import "../styles/style.css";
import { array } from "./array";
import "./array";

document.querySelector(".start").addEventListener("click", function () {
  DOMSelectors.start.remove();
  DOMSelectors.explaination.remove();
  DOMSelectors.timerbox.insertAdjacentHTML(
    "afterbegin",
    `<p class="timer">1:00</p>`
  );
  // DOMSelectors.body = ``;
  // board();
  setInterval(timer, 1000);
  timer();
  //remove the start button
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

function grid() {}
grid();
// function flipcard() {}

// function check() {}

// <button class="home"><i class="fa fa-home"></i></button>
