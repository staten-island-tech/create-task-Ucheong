import "./dom";
import "../styles/style.css";
import { DOMSelectors } from "./dom";
// import "./object";
// import { object } from "./object";

document.querySelector(".start").addEventListener("click", function () {
  DOMSelectors.body = ``;
  memorygame();
  timer();
});

function memorygame() {}

function timer() {}
