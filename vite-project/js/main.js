import "./dom";
import { DOMSelectors } from "./dom";
import "../styles/style.css";
// import "./object";
// import { object } from "./object";

document.querySelector(".start").addEventListener("click", function () {
  // DOMSelectors.body = ``;
  // memorygame();
  timer();
});

function memorygame() {}

setInterval(timer, 1000);

let time = 60;

function timer() {
  let minutes = Math.floor(time / 60);
  let seconds = time % 60;

  seconds = seconds < 10 ? `0` + seconds : seconds;

  timer.innerHTML = `${minutes}:${seconds}`;
  time--;
}
