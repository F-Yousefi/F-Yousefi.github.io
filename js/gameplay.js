"use strict";
// from here
function fadeSplashScreen(x) {
  // console.log(splashScreen.classList);
  splashScreen.classList.add("fade-out");
  console.log(splashScreen.classList);
}

function roundedRand(mul) {
  return Math.round(Math.random() * mul);
}
function floorRand(mul) {
  return Math.floor(Math.random() * mul);
}

function directionFinder(btnId, goal) {
  let hintMsg = "";
  if (btnId === goal) hintMsg += "Sweet Dreams!";
  if (btnId[1] < goal[1]) hintMsg = "➡";
  if (btnId[1] > goal[1]) hintMsg = "⬅";
  if (btnId[0] < goal[0]) hintMsg = "⬇";
  if (btnId[0] > goal[0]) hintMsg = "⬆";
  if (btnId[1] < goal[1] && btnId[0] < goal[0]) hintMsg = "↘";
  if (btnId[1] < goal[1] && btnId[0] > goal[0]) hintMsg = "↗";
  if (btnId[1] > goal[1] && btnId[0] > goal[0]) hintMsg = "↖";
  if (btnId[1] > goal[1] && btnId[0] < goal[0]) hintMsg = "↙";
  return hintMsg;
}

const hint = document.getElementById("hint");
const gameMap = document.getElementById("game_map");
const theEndScreen = document.getElementById("the_end_screen");
const movesNumber = document.getElementById("moves_number");
const starsNumber = document.getElementById("stars_number");
let moves = 0;
const startButton = document.getElementById("start_button");
const splashScreen = document.getElementById("splash_screen");
const tryAgainButton = document.getElementById("try_again_button");

// creation of gameplay
const avail = []; // active btns
let idCounter = ""; // id calculator
const rowNum = 8;
const colNum = 7;

startButton.addEventListener("click", fadeSplashScreen);
splashScreen.addEventListener("transitionend", () => {
  splashScreen.parentNode.removeChild(splashScreen);
  gameMap.classList.add("fade-in");
});

tryAgainButton.addEventListener("click", () => {
  window.location.reload();
});

for (let j = 0; j < rowNum; j++) {
  //Row creation ...
  const row = document.createElement("div");
  row.classList.add("flex-row");

  for (let i = 0; i < colNum; i++) {
    idCounter = "" + j + i;
    const btn = document.createElement("div");
    btn.id = "btn" + String(idCounter);

    //Active some btns with a little help of 0.2
    if (Math.round(Math.random() + 0.2)) {
      // Random image selection
      btn.style.backgroundImage = `url("img/star${roundedRand(7) + 1}.jpg")`;
      btn.style.marginLeft = roundedRand(15) + "px";
      btn.active = true;
      avail.push(idCounter);
    }

    btn.style.alignSelf = `${["flex-end", "flex-start", "center"][roundedRand(2)]}`;
    btn.classList.add("stars");

    //btns programs
    btn.addEventListener("click", function (event) {
      if (btn.active) {
        btn.active = false;
        this.classList.add("fade-out");
        const buttonId = this.id;
        const btnId = buttonId.slice(3, 5);
        const arrow = directionFinder(btnId, goal);

        if (arrow == "Sweet Dreams!") {
          gameMap.classList.add("fade-out");
          theEndScreen.classList.add("fade-in");
        } else {
          hint.textContent = arrow;
          moves++;
          movesNumber.textContent =
            movesNumber.textContent.slice(0, 6) + " " + moves;

          starsNumber.textContent =
            starsNumber.textContent.slice(0, 6) + " " + (avail.length - moves);
        }
      }
    });
    row.appendChild(btn);
  }
  gameMap.appendChild(row);
}
const goal = avail[Math.floor(Math.random() * avail.length)];
