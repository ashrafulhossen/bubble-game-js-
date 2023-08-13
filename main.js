const playground = document.querySelector(".main-section");
const timerEle = document.querySelector(".time").children[1];
const hitEle = document.querySelector(".hit").children[1];
const scoreEle = document.querySelector(".score").children[1];
const dialogEle = document.querySelector(".dialog-container");
const startGameELe = document.querySelector("#game-start");
const showScoreEle = document.querySelector("#score-point");

let time = 0;
let score = 0;
let hitNumber = 0;
let timeoutId;

// =============== functions ==============
const createBubble = () => {
	if (timeoutId) {
		clearTimeout(timeoutId);
		timeoutId = 0;
	} else {
		timeoutId = setTimeout(() => {
			const row = Math.floor((playground.scrollHeight - 40) / 61);
			const column = Math.floor((playground.scrollWidth - 40) / 61);
			const totalBubble = row * column;

			playground.innerHTML = "";
			for (let bubble = 1; bubble <= totalBubble; bubble++) {
				playground.innerHTML += `<div class="bubble">${Math.floor(
					Math.random() * 10
				)}</div>`;
			}
		}, 300);
	}
};

const timer = () => {
	time = 60;
	const clearTime = setInterval(() => {
		if (time >= 0) {
			timerEle.textContent = time;
			time--;
		} else {
			gameOver();
			clearInterval(clearTime);
		}
	}, 1000);
};

const hit = () => {
	hitNumber = Math.floor(Math.random() * 10);
	hitEle.textContent = hitNumber;
};

const increaseScoore = (e) => {
	const hittedNumber = +e.target.textContent;
	if (hitNumber === hittedNumber && time > 0) {
		score += 10;
		scoreEle.textContent = score;
		createBubble();
		hit();
	}
};

const startGame = () => {
	console.log("gameStarted");
	timer();
	hit();
	dialogEle.style.display = "none";
};

const gameOver = () => {
	console.log("gameOver");
	dialogEle.style.display = "flex";
	showScoreEle.textContent = score;
	score = 0;
	time = 0;
	hitNumer = 0;
};

// =========================================
createBubble();

playground.addEventListener("click", increaseScoore);
startGameELe.addEventListener("click", startGame);

window.addEventListener("resize", createBubble);
