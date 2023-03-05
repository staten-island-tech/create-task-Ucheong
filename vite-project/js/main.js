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
  DOMSelectors.timerbox.innerHTML = `${minutes}:${seconds}`;
  time--;
}

if (time === 0) {
  popup();
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

let selected = 0;

function flipcard(event) {
  const randomcard = array.pop();
  const img = event.target;
  img.src = randomcard.image;
  const cards = document.querySelectorAll(".black");
  cards.forEach((card) => {
    card.addEventListener("click", function () {
      selected++;
      if (selected === 2) {
        setTimeout(check, 500);
      }
      selected = 0;
    });
  });
  // if (selected.length === 2) {
  //   setTimeout(check, 500);
  // }
}

let score = 0;

function check() {
  for (let i = 0; i < 15; i++) {
    const firstimg = selected[0].querySelector("img").getAttribute("src");
    const secondimg = selected[1].querySelector("img").getAttribute("src");
    if (firstimg === secondimg) {
      DOMSelectors.scoreparent.innerHTML = `Score: ${i}/15`;
      firstimg.remove();
      secondimg.remove();
    } else if (firstimg !== secondimg) {
      selected.forEach((card) => {
        card.querySelector("img").setAttribute(`src`, `../imgs/black.avif`);
      });
    }
  }
}

function popup() {
  let popupparent = document.createElement(`div`);
  //no cards left
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

// array.forEach((card) => {
//   card.addEventListener(`click`, () => {
//     let image = card.image;
//     console.log(array);
//     DOMSelectors.grid.insertAdjacentHTML(
//       "afterbegin",
//       `<div class="default">
//       <img src="../imgs/black.avif" alt="The Color Black"/>
//       </div>
//       <div class="monkey"> <img src="{image}"> </div>`
//     );
//   });
// });

// for (let i = 0; i < cardCount; i++) {
//   const card = document.createElement(`img`);
//   card.setAttribute(`data-id`, i);
//   card.addEventListener(`click`, flipcard);

//function () {
//   const randomcard = array[Math.floor(Math.random() * cardArray.length)];
//   const img = this.querySelector("img");
//   img.src = randomcard.img;
// });
