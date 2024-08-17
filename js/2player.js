let board, currentPlayer, gameActive;
const playerX = "X";
const playerO = "O";

document.addEventListener('DOMContentLoaded', () => {
    document.querySelectorAll('.cell').forEach(cell => cell.addEventListener('click', handleCellClick));
    document.querySelector('.game-restart').addEventListener('click', restartGame);
    initGame();
});

function initGame() {
    board = ["", "", "", "", "", "", "", "", ""];
    currentPlayer = playerX;
    gameActive = true;
    document.querySelector('.game-status').innerText = `It's ${currentPlayer}'s turn`;
    document.querySelectorAll('.cell').forEach(cell => {
        cell.innerText = "";
        cell.classList.remove('winning-cell');
    });
}

function handleCellClick(event) {
    const clickedCellIndex = parseInt(event.target.getAttribute('data-index'));

    if (board[clickedCellIndex] !== '' || !gameActive) return;

    board[clickedCellIndex] = currentPlayer;
    event.target.innerText = currentPlayer;

    if (checkWin()) {
        document.querySelector('.game-status').innerText = `${currentPlayer} wins!`;
        gameActive = false;
    } else if (board.includes("")) {
        currentPlayer = currentPlayer === playerX ? playerO : playerX;
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
