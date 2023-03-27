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
  chosen = [],
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
  //if there are less than 10 seconds, then a zero is added at the end of the amount of seconds, if not, I keep it as is
  if (seconds < 10) {
    seconds = "0" + seconds;
  } else {
    seconds = time % 60;
  }
  DOMSelectors.timer.innerHTML = `${minutes}m:${seconds}s`;
  time--;
  //if the time is at 0m:00s, clearInterval(interval) makes it so that the time does not go into the negatives (ex. -1m:00s); a popup also appears and says that you lost
  if (time === -1) {
    clearInterval(interval);
    losePopup();
  }
}

function grid(mode) {
  const blackImg = "../imgs/black.avif";
  //Depending on which difficulty level is chosen, the totalScore and cardCount changes
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
  //generate cards for the grid based on the mode
  for (let i = 0; i < cardCount; i++) {
    //make monkeyImg equal a random element in monkeyArray
    let monkeyImg =
      monkeyArray[Math.floor(Math.random() * (monkeyArray.length - 1))];
    DOMSelectors.grid.insertAdjacentHTML(
      "afterbegin",
      `<img class="card" src="${blackImg}" id="${monkeyImg}"/>`
    );
    //makes sure that each monkeyImg is only used once
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

//shuffle the array
function shuffle() {
  monkeyArray.sort(() => 0.5 - Math.random());
}

//flips the card
function flipCard(event) {
  const img = event.target;
  img.src = img.id;
  const card = { src: img.id, element: img };
  chosen.push(card);
  card.element.removeEventListener("click", flipCard);
  //if two cards are chosen, it removes every cards eventlistener and checks for a match
  if (chosen.length === 2) {
    cards.forEach((card) => {
      card.removeEventListener("click", flipCard);
    });
    setTimeout(check, 600);
  }
}

//checks for match
function check() {
  let firstImg = chosen[0].src;
  let secondImg = chosen[1].src;
  //if the two images in the chosen array match, the score increases by one
  if (firstImg === secondImg) {
    score++;
    DOMSelectors.score.innerHTML = `Score: ${score}/${totalScore}`;
    // if the current score equals the total score, clearInterval(interval) makes it so that the time does not go into the negatives (ex. -1m:00s); a popup also appears and says that you won
    if (score === totalScore) {
      clearInterval(interval);
      winPopup();
    }
    chosen.forEach((card) => {
      card.element.classList.add("match");
    });
  } else {
    //the chosen cards flip back over
    chosen.forEach((card) => {
      card.element.src = `../imgs/black.avif`;
      card.element.addEventListener("click", flipCard);
    });
  }
  chosen = [];
  //removes click event from all the cards in the match class, adds the click event back to all the cards thats not in the match class
  const matched = document.querySelectorAll(".match");
  matched.forEach((card) => {
    card.removeEventListener("click", flipCard);
  });
  cards.forEach((card) => {
    if (!card.classList.contains("match")) {
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

//sends you back to the starting page
function home() {
  document.querySelector(".home").addEventListener("click", function () {
    location.reload();
  });
}

// add comments to code for functionally
//cite all my sources ex. the shuffle function, figure it out for the time function, the math.floor, the index of one
