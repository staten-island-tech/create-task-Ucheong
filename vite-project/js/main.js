import "../styles/style.css";

const monkeyArray = [
  "imgs/monkey1.jpg",
  "imgs/monkey1.jpg",
  "imgs/monkey2.jpg",
  "imgs/monkey2.jpg",
  "imgs/monkey3.jpg",
  "imgs/monkey3.jpg",
  "imgs/monkey4.jpg",
  "imgs/monkey4.jpg",
  "imgs/monkey5.jpg",
  "imgs/monkey5.jpg",
  "imgs/monkey6.jpg",
  "imgs/monkey6.jpg",
  "imgs/monkey7.jpg",
  "imgs/monkey7.jpg",
  "imgs/monkey8.jpg",
  "imgs/monkey8.jpg",
  "imgs/monkey9.jpg",
  "imgs/monkey9.jpg",
  "imgs/monkey10.jpg",
  "imgs/monkey10.jpg",
  "imgs/monkey11.jpg",
  "imgs/monkey11.jpg",
  "imgs/monkey12.jpg",
  "imgs/monkey12.jpg",
  "imgs/monkey13.jpg",
  "imgs/monkey13.jpg",
  "imgs/monkey14.jpg",
  "imgs/monkey14.jpg",
  "imgs/monkey15.jpg",
  "imgs/monkey15.jpg",
];

const DOMSelectors = {
  timer: document.querySelector(".timer"),
  score: document.querySelector(".score"),
  popup: document.querySelector(".popup"),
  starting: document.querySelector(".starting"),
  hard: document.querySelector(".hard"),
  medium: document.querySelector(".medium"),
  easy: document.querySelector(".easy"),
  homeInGame: document.querySelector(".homeInGame"),
  grid: document.querySelector(".grid"),
};

let cards = document.querySelectorAll(".card"),
  selected = [],
  time = 60,
  cardCount = ``,
  totalScore = ``,
  score = 0;
let interval;

DOMSelectors.easy.addEventListener("click", function () {
  grid("Easy");
});

DOMSelectors.medium.addEventListener("click", function () {
  grid("Medium");
});

DOMSelectors.hard.addEventListener("click", function () {
  grid("Hard");
});

function timer() {
  let minutes = Math.floor(time / 60);
  let seconds = time % 60;
  if (seconds < 10) {
    seconds = "0" + seconds;
  } else {
    seconds = time % 60;
  }
  DOMSelectors.timer.innerHTML = `${minutes}m:${seconds}s`;
  time--;
  if (time === -1) {
    clearInterval(interval);
    losePopup();
  }
}

function grid(mode) {
  const blackImg = "../imgs/black.avif";
  switch (mode) {
    case "Easy":
      monkeyArray.splice(10);
      totalScore = 5;
      cardCount = 10;
      break;
    case "Medium":
      monkeyArray.splice(20);
      totalScore = 10;
      cardCount = 20;
      break;
    case "Hard":
      monkeyArray.splice(30);
      totalScore = 15;
      cardCount = 30;
      break;
    default:
      totalScore = 15;
      cardCount = 30;
  }
  for (let i = 0; i < cardCount; i++) {
    let monkeyImg =
      monkeyArray[Math.floor(Math.random() * (monkeyArray.length - 1))];
    DOMSelectors.grid.insertAdjacentHTML(
      "afterbegin",
      `<img class="card" src="${blackImg}" id="${monkeyImg}"/>`
    );
    monkeyArray.splice(monkeyArray.indexOf(monkeyImg), 1);
  }
  cards = document.querySelectorAll(".card");
  cards.forEach((card) => {
    card.addEventListener("click", flipCard);
  });
  DOMSelectors.starting.remove();
  DOMSelectors.timer.innerHTML = "<p class='timer'>1:00</p>";
  DOMSelectors.score.innerHTML = `<p class="score"> Score: 0/${totalScore} </p>`;
  interval = setInterval(timer, 1000);
  shuffle();
  timer();
  DOMSelectors.homeInGame.insertAdjacentHTML(
    "afterbegin",
    `<button class="homeInGame">Home <i class="fa fa-home"></i></button>`
  );
  document.querySelector(".homeInGame").addEventListener("click", function () {
    location.reload();
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
    DOMSelectors.score.innerHTML = `Score: ${score}/${totalScore}`;
    if (score === totalScore) {
      clearInterval(interval);
      winPopup();
    }
    selected.forEach((card) => {
      card.element.classList.add("matched");
    });
  } else {
    selected.forEach((card) => {
      card.element.src = `../imgs/black.avif`;
      card.element.addEventListener("click", flipCard);
    });
  }
  selected = [];
  const matchedCards = document.querySelectorAll(".matched");
  matchedCards.forEach((card) => {
    card.removeEventListener("click", flipCard);
  });
  cards.forEach((card) => {
    if (!card.classList.contains("matched")) {
      card.addEventListener("click", flipCard);
    }
  });
}

function winPopup() {
  DOMSelectors.popup.insertAdjacentHTML(
    "afterbegin",
    `<div class="winPopup">
    <h2 class="stat"> Congratulations!</h2> 
    <p class="desc"> You have won the game!</p> 
    <p class="details"> Score: ${score}/${totalScore} </p> 
    <p class="details"> Time Left: ${time + 1}s </p> 
    <button class="home"><i class="fa fa-home"></i>Home</button>
    </div> `
  );
  home();
  document.querySelector(".homeInGame").remove();
}

function losePopup() {
  DOMSelectors.popup.insertAdjacentHTML(
    "afterbegin",
    `<div class="losePopup"> 
    <h2 class="stat"> Time's Up!</h2> 
    <p class="desc"> You have lost the game!</p> 
    <p class="details"> Score: ${score}/${totalScore} </p>
    <p class="details"> Time Left: 0s </p> 
    <button class="home">Home <i class="fa fa-home"></i></button>
    </div>`
  );
  home();
  document.querySelector(".homeInGame").remove();
}

function home() {
  document.querySelector(".home").addEventListener("click", function () {
    location.reload();
  });
}

// add comments to code for functionally
