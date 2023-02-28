import "./dom";
import { DOMSelectors } from "./dom";
import "../styles/style.css";
import { array } from "./array";
// import "./array";
// import { array } from "./array";

document.querySelector(".start").addEventListener("click", function () {
  // DOMSelectors.body = ``;
  // board();
  setInterval(timer, 1000);
  timer();
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

  DOMSelectors.timer.innerHTML = `${minutes}:${seconds}`;
  time--;
}

array.sort(() => 0.5 - Math.random());

// function grid() {
//   .display.insertAdjacentHTML;
// }
// function flipcard() {}

function check() {}
