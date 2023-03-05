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
  shuffle();
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
    let timeinterval;
    clearInterval(timeinterval);
    losepopup();
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
  const blackimg = "../imgs/black.avif";
  for (let i = 0; i < cardCount; i++) {
    DOMSelectors.display.insertAdjacentHTML(
      "afterbegin",
      `<img class="card" src="${blackimg}" alt="The Color Black"/>`
    );
  }
  const cards = document.querySelectorAll(".card");
  cards.forEach((card) => {
    card.addEventListener("click", flipcard);
  });
  // cards.forEach((card, index) => {
  //   card.addEventListener("click", flipcard);
  //   card.dataset.monkey = array[index];
  // });
}

function shuffle() {
  array.sort(() => 0.5 - Math.random());
}

let selected = [];

function flipcard(event) {
  const randomcard = array.pop();
  const img = event.target;
  const imgs = "imgs";
  img.classList.add(imgs);
  img.src = randomcard;
  const card = { src: randomcard, element: img };
  selected.push(card);
  img.removeEventListener(`click`, flipcard);
  if (selected.length === 2) {
    // const cards = document.querySelectorAll(".card");
    // cards.forEach((card) => {
    //   card.removeEventListener("click", flipcard);
    // });
    setTimeout(check, 500);
  }
}

let score = 0;
let pairs = 15;

function check() {
  let firstimg = selected[0].src;
  let secondimg = selected[1].src;
  if (firstimg === secondimg) {
    score++;
    DOMSelectors.scoreparent.innerHTML = `Score: ${score}/15`;
    selected[0].element.remove();
    selected[1].element.remove();
    firstimg = null;
    secondimg = null;
    pairs--;
    if (pairs === 0) {
      winpopup();
    }
  } else {
    selected.forEach((card) => {
      card.element.src = `../imgs/black.avif`;
      card.element.addEventListener("click", flipcard);
    });
  }
  selected = [];
  // const cards = document.querySelectorAll(".card");
  // cards.forEach((card) => {
  //   if (!card.classList.contains("imgs")) {
  //     card.addEventListener("click", flipcard);
  //   }
  // });
}

function losepopup() {
  popup.innerHTML = `<h2> YOU WIN!</h2> <p> Score: 15/15 </p> <p> Time Left: ${time}s </p> <button class="home"><i class="fa fa-home"></i></button>`;
}
function winpopup() {
  popup.innerHTML = `<h2> YOU LOSE!</h2> <p> Score: ${score}/15 </p> <p> Time Left: 0s </p> <button class="home"><i class="fa fa-home"></i></button>`;
}

// let popup = document.createElement(`div`);
// popup.classList.add("popup");

// document.body.appendChild(popup);
// popupparent.style.display = "block";
// document.querySelector(".home").addEventListener("click", function () {
//   DOMSelectors.display.innerHTML = ``;
// });

//run the check function so that it still works after i get a point
//css
//doesnt have a different image everytime
//restrict clicking once two are
