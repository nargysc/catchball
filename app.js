const startBtn = document.querySelector("#start");
const timeList = document.querySelector("#time-list");
const timeEl = document.querySelector("#time");
const board = document.querySelector("#board");
const screens = document.querySelectorAll(".screen");

const colors = [
    '#e0FA3B1', '#D9E5D6', '#EDDEA4', '#F7A072', '#FF9B42'
];

function getRandomColor() {
  return colors[Math.floor(Math.random() * colors.length)];
}

function setColor(element) {
  
  const color = getRandomColor();
  element.style.background = color;
  // element.style.boxShadow = `0 0 2px ${color}, 0 0 6px ${color}`;
}

let time = 0;
let score = 0;

startBtn.addEventListener("click", (event) => {
  event.preventDefault();
  screens[0].classList.add("up");
});

timeList.addEventListener("click", (event) => {
  if (event.target.classList.contains("time-btn")) {
    time = parseInt(event.target.getAttribute("data-time"));
    screens[1].classList.add("up");
    startGame();
  }
});

board.addEventListener("click", (event) => {
  if (event.target.classList.contains("circle")) {
    score++;
    event.target.remove();
    createRandomCircle();
    // getRandomColor();
  }
});

function startGame() {
  setInterval(decreaseTime, 1000);
  createRandomCircle().setColor();
  setTime(time);
}

function decreaseTime() {
  if (time === 0) {
    finishGame();
  } else {
    let current = --time;
    if (current < 10) {
      current = `0${current}`;
    }
    setTime(current);
  }
}

function setTime(value) {
  timeEl.innerHTML = `00:${value}`;
}

function finishGame() {
  timeEl.parentNode.classList.add("hide");
  board.innerHTML = `<h1>Count: <span class="primary">${score}</span></h1>`;
}

function createRandomCircle() {
  const circle = document.createElement("div");
  const size = getRandomNumber(10, 40);
  const { width, height } = board.getBoundingClientRect();
  const x = getRandomNumber(0, width - size);
  const y = getRandomNumber(0, height - size);
  circle.classList.add("circle");
  // circle.addEventListener("click", () => setColor(circle));

  circle.style.width = `${size}px`;
  circle.style.height = `${size}px`;
  circle.style.top = `${y}px`;
  circle.style.left = `${x}px`;
	setColor(circle)
  board.append(circle);
}

function getRandomNumber(min, max) {
  return Math.round(Math.random() * (max - min) + min);
}

