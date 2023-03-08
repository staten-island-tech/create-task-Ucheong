import "./dom";
import { DOMSelectors } from "./dom";
import "../styles/style.css";
import { monkeyArray } from "./array";
import "./array";

let cards = document.querySelectorAll(".card"),
  selected = [],
  time = 60,
  score = 0;

document.querySelector(".start").addEventListener("click", function () {
  DOMSelectors.start.remove();
  // DOMSelectors.gridbefore.remove();
  DOMSelectors.timerBox.insertAdjacentHTML(
    "afterbegin",
    `<p class="timer">1:00</p>`
  );
  DOMSelectors.scoreParent.insertAdjacentHTML(
    "afterbegin",
    `<p class="score"> Score: 0/15 </p>`
  );
  setInterval(timer, 1000);
  shuffle();
  timer();
  grid();
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

function losePopup() {
  DOMSelectors.popup.innerHTML = `<h2> Congratulations!</h2> <p> You have won the game!</p> <p> Score: 15/15 </p> <p> Time Left: ${time}s </p> <button class="home"><i class="fa fa-home"></i></button> <button class="again"> Play Again</button`;
}
function winPopup() {
  DOMSelectors.popup.innerHTML = `<h2> Time's Up!</h2> <p> You have lost the game!</p> <p> Score: ${score}/15 </p> <p> Time Left: 0s </p> <button class="home"><i class="fa fa-home"></i></button> <button class="again"> Play Again</button>`;
}

// let popup = document.createElement(`div`);
// popup.classList.add("popup");

// document.body.appendChild(popup);
// popupparent.style.display = "block";
// document.querySelector(".home").addEventListener("click", function () {
//   DOMSelectors.display.innerHTML = ``;
// });

//document.querySelector(".restart").addEventListener("click", function () {})
//run the check function so that it still works after i get a point
//doesnt have a different image everytime
//restrict clicking once two are
