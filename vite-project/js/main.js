import "./dom";
import { DOMSelectors } from "./dom";
import "../styles/style.css";
// import "./array";
// import { array } from "./array";

document.querySelector(".start").addEventListener("click", function () {
  // DOMSelectors.body = ``;
  // memorygame();
  setInterval(timer, 1000);
  timer();
});

// function memorygame() {}

let time = 60;

function timer() {
  let minutes = Math.floor(time / 60);
  let seconds = time % 60;
  seconds = seconds < 10 ? `0` + seconds : seconds;

  DOMSelectors.timer.innerHTML = `${minutes}:${seconds}`;
  time--;
}

// function flipcard() {}
