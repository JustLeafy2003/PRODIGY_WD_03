let board, currentPlayer, gameActive;
const playerX = "X";
const playerO = "O";

document.addEventListener('DOMContentLoaded', () => {
    document.querySelectorAll('.cell').forEach(cell => {
            cell.addEventListener('click', handleCellClick);
            cell.addEventListener('focus', (event) => {
                event.target.classList.add('selected');
            });
            cell.addEventListener('blur', (event) => {
                event.target.classList.remove('selected');
            });
        });
    document.querySelector('.game-restart').addEventListener('click', restartGame);
    initGame();
});

function initGame() {
    board = ["", "", "", "", "", "", "", "", ""];
    currentPlayer = Math.random() < 0.5 ? playerX : playerO;
    gameActive = true;
    document.querySelector('.game-status').innerText = `It's ${currentPlayer}'s turn`;
    document.querySelectorAll('.cell').forEach(cell => {
        cell.innerText = "";
        cell.classList.remove('winning-cell');
    });

    if (currentPlayer === playerO) {
        setTimeout(handleAIMove, 500);
    }
}

function handleCellClick(event) {
    if (board[event.target.getAttribute('data-index')] !== '' || !gameActive || currentPlayer === playerO) return;

    processPlayerMove(event.target.getAttribute('data-index'));
}

function processPlayerMove(clickedCellIndex) {
    board[clickedCellIndex] = currentPlayer;
    let clickedCell = document.querySelector(`.cell[data-index='${clickedCellIndex}']`);
    clickedCell.innerText = currentPlayer;
    clickedCell.classList.add('selected'); 

    if (checkWin()) {
        document.querySelector('.game-status').innerText = `${currentPlayer} wins!`;
        gameActive = false;
    } else if (board.includes("")) {
        currentPlayer = playerO;
        document.querySelector('.game-status').innerText = `It's ${currentPlayer}'s turn`;
        setTimeout(handleAIMove, 500); // Delay AI move for 0.5s
    } else {
        document.querySelector('.game-status').innerText = `It's a tie!`;
        gameActive = false;
    }
}

function handleAIMove() {
    let availableCells = board.map((cell, index) => cell === "" ? index : null).filter(index => index !== null);

    let randomIndex = availableCells[Math.floor(Math.random() * availableCells.length)];

    board[randomIndex] = playerO;
    document.querySelector(`.cell[data-index='${randomIndex}']`).innerText = playerO;

    if (checkWin()) {
        document.querySelector('.game-status').innerText = `${currentPlayer} wins!`;
        gameActive = false;
    } else if (board.includes("")) {
        currentPlayer = playerX;
        document.querySelector('.game-status').innerText = `It's ${currentPlayer}'s turn`;
    } else {
        document.querySelector('.game-status').innerText = `It's a tie!`;
        gameActive = false;
    }
}

function checkWin() {
    const winConditions = [
        [0, 1, 2], [3, 4, 5], [6, 7, 8],
        [0, 3, 6], [1, 4, 7], [2, 5, 8],
        [0, 4, 8], [2, 4, 6]
    ];

    let winCondition = winConditions.find(condition => {
        return condition.every(index => board[index] === currentPlayer);
    });

    if (winCondition) {
        winCondition.forEach(index => {
            let cell = document.querySelector(`.cell[data-index='${index}']`);
            cell.classList.add('winning-cell');
        });
        return true;
    }
    return false;
}

function restartGame() {
    initGame();
}
