"use strict";

const playerOne = document.getElementById("player_one");
const playerTwo = document.getElementById("player_two");
const playerOneScore = document.getElementById("player_0_score");
const playerTwoScore = document.getElementById("player_1_score");
const currentScoreOne = document.getElementById("current_score_0");
const currentScoreTwo = document.getElementById("current_score_1");

const diceImage = document.getElementById("dice_image");

const newGame = document.getElementById("new_game");
const howToPlay = document.getElementById("how_to_play");
const holdScore = document.getElementById("hold_score");
const rollDice = document.getElementById("roll_dice");

const winnerModal = document.getElementById("winner_modal");
const howToPlayModal = document.getElementById("how_to_play_modal");
const closedX = document.querySelectorAll("#closed_x");
const overlay = document.getElementById("overlay");

let totalScoreValue, currentScoreValue, activePlayer, playerPlaying;

const newGameReset = () => {
  totalScoreValue = [0, 0];
  currentScoreValue = 0;
  activePlayer = 0;
  playerPlaying = true;

  playerOneScore.textContent = 0;
  playerTwoScore.textContent = 0;
  currentScoreOne.textContent = 0;
  currentScoreTwo.textContent = 0;

  playerOne.classList.remove("bg-opacity-70");
  playerTwo.classList.add("bg-opacity-70");
  diceImage.classList.add("hidden");
};

newGameReset();

const switchPlayer = () => {
  document.getElementById(`current_score_${activePlayer}`).textContent = 0;
  currentScoreValue = 0;
  activePlayer = activePlayer === 0 ? 1 : 0;
  playerOne.classList.toggle("bg-opacity-70");
  playerTwo.classList.toggle("bg-opacity-70");
};

const displayWinnerModal = () => {
  winnerModal.classList.remove("hidden");
  overlay.classList.remove("hidden");
};

rollDice.addEventListener("click", () => {
  if (playerPlaying) {
    let randomNumber = Math.floor(Math.random() * 6) + 1;
    diceImage.classList.remove("hidden");
    diceImage.src = `/assets/svg/dice-${randomNumber}.svg`;

    if (randomNumber !== 1) {
      currentScoreValue += randomNumber;
      document.getElementById(`current_score_${activePlayer}`).textContent = currentScoreValue;
    } else {
      switchPlayer();
    }
  }
});

holdScore.addEventListener("click", () => {
  if (playerPlaying) {
    if (currentScoreValue === 0) {
      !switchPlayer();
    }

    totalScoreValue[activePlayer] += currentScoreValue;
    document.getElementById(`player_${activePlayer}_score`).textContent = totalScoreValue[activePlayer];

    if (totalScoreValue[activePlayer] >= 100) {
      diceImage.classList.add("hidden");
      displayWinnerModal();
      document.getElementById("player_winner").textContent = activePlayer === 0 ? "Player One Win!" : "Player Two Win!";
      playerPlaying = false;
    } else {
      switchPlayer();
    }
  }
});

newGame.addEventListener("click", newGameReset);

const displayHowToPlayModal = () => {
  howToPlayModal.classList.remove("hidden");
  overlay.classList.remove("hidden");
};

howToPlay.addEventListener("click", displayHowToPlayModal);

closedX.forEach((close) => {
  close.addEventListener("click", () => {
    howToPlayModal.classList.add("hidden");
    overlay.classList.add("hidden");
    winnerModal.classList.add("hidden");
  });
});
