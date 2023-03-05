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
  DOMSelectors.scoreparent.insertAdjacentHTML(
    "afterbegin",
    `<p class="score"> Score: 0/15 </p>`
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
  DOMSelectors.timerbox.innerHTML = `${minutes}m:${seconds}s`;
  time--;
  if (time === 0) {
    popup();
  }
}

// function gridbefore() {
//   const cardCount = 30;
//   for (let i = 0; i < cardCount; i++) {
//     DOMSelectors.display.insertAdjacentHTML(
//       "afterbegin",
//       `<div class="default">
//       <img src="../imgs/black.avif" alt="The Color Black"/>
//       </div>`
//     );
//   }
// }
// gridbefore();

function grid() {
  const cardCount = 30;
  for (let i = 0; i < cardCount; i++) {
    DOMSelectors.display.insertAdjacentHTML(
      "afterbegin",
      `<img class="black" src="../imgs/black.avif" alt="The Color Black"/>`
    );
  }
  const cards = document.querySelectorAll(".black");
  cards.forEach((card) => {
    card.addEventListener("click", flipcard);
  });
}

array.sort(() => 0.5 - Math.random());

let selected = [];

function flipcard(event) {
  const randomcard = array.pop();
  const img = event.target;
  img.src = randomcard;
  selected.push(randomcard);
  img.removeEventListener(`click`, flipcard);
  if (selected === 2) {
    setTimeout(check, 500);
  }
}

let score = 0;

function check() {
  array.forEach((element) => {
    if (element) {
      element.classList.add("poo");
    }
  });
  const firstimg = selected[0].querySelector("poo").getAttribute("src");
  const secondimg = selected[1].querySelector("poo").getAttribute("src");
  if (firstimg === secondimg) {
    score++;
    DOMSelectors.scoreparent.innerHTML = `Score: ${score}/15`;
    firstimg.remove();
    secondimg.remove();
    reset();
  } else {
    selected.forEach((card) => {
      card.querySelector("img").setAttribute(`src`, `../imgs/black.avif`);
      card.addEventListener("click", flipcard);
      selected = [];
    });
  }
}

function reset() {
  firstCard = null;
  secondCard = null;
}

function popup() {
  let popupparent = document.createElement(`div`);
  array.forEach((element) => {
    if (element) {
      element.classList.add("poo");
    }
  });
  const cards = document.querySelectorAll(".poo");
  if (cards.length === 0) {
    popupparent.innerHTML = `<h2> YOU WIN!</h2> <p> Score: 15/15 </p> <p> Time Left: ${time}s </p> <button class="home"><i class="fa fa-home"></i></button>`;
  } else {
    popupparent.innerHTML = `<h2> YOU LOSE!</h2> <p> Score: ${score}/15 </p> <p> Time Left: 0s </p> <button class="home"><i class="fa fa-home"></i></button>`;
  }
  popupparent.style.display = "block";
  document.querySelector(".home").addEventListener("click", function () {
    DOMSelectors.display.innerHTML = ``;
  });
}
