const boardElement = document.getElementById('board');
const statusElement = document.getElementById('status');
const resetButton = document.getElementById('reset');
const playerVsPlayerButton = document.getElementById('playerVsPlayer');
const playerVsComputerButton = document.getElementById('playerVsComputer');

let board = ['', '', '', '', '', '', '', '', ''];
let currentPlayer = 'X';
let isGameOver = false;
let gameMode = null; // 'pvp' or 'pvc'

function renderBoard() {
    boardElement.innerHTML = '';
    board.forEach((cell, index) => {
        const cellElement = document.createElement('div');
        cellElement.classList.add('cell');
        cellElement.textContent = cell;
        cellElement.addEventListener('click', () => handleCellClick(index));
        boardElement.appendChild(cellElement);
    });
}

function handleCellClick(index) {
    if (board[index] === '' && !isGameOver) {
        board[index] = currentPlayer;
        renderBoard();
        if (checkWinner()) {
            statusElement.textContent = `${currentPlayer} wins!`;
            isGameOver = true;
        } else if (board.every(cell => cell !== '')) {
            statusElement.textContent = 'It\'s a draw!';
            isGameOver = true;
        } else {
            currentPlayer = currentPlayer === 'X' ? 'O' : 'X';
            statusElement.textContent = `Player ${currentPlayer}'s turn`;
            if (gameMode === 'pvc' && currentPlayer === 'O') {
                computerMove();
            }
        }
    }
}

function checkWinner() {
    const winPatterns = [
        [0, 1, 2], [3, 4, 5], [6, 7, 8],
        [0, 3, 6], [1, 4, 7], [2, 5, 8],
        [0, 4, 8], [2, 4, 6]
    ];
    return winPatterns.some(pattern => {
        const [a, b, c] = pattern;
        return board[a] && board[a] === board[b] && board[a] === board[c];
    });
}

function computerMove() {
    const emptyCells = board.map((cell, index) => cell === '' ? index : null).filter(index => index !== null);
    const randomIndex = Math.floor(Math.random() * emptyCells.length);
    board[emptyCells[randomIndex]] = 'O';
    renderBoard();
    if (checkWinner()) {
        statusElement.textContent = `O wins!`;
        isGameOver = true;
    } else if (board.every(cell => cell !== '')) {
        statusElement.textContent = 'It\'s a draw!';
        isGameOver = true;
    } else {
        currentPlayer = 'X';
        statusElement.textContent = `Player X's turn`;
    }
}

function resetGame() {
    board = ['', '', '', '', '', '', '', '', ''];
    currentPlayer = 'X';
    isGameOver = false;
    renderBoard();
    statusElement.textContent = `Choose a mode to start the game!`;
    gameMode = null;
}

playerVsPlayerButton.addEventListener('click', () => {
    resetGame();
    gameMode = 'pvp';
    statusElement.textContent = `Player X's turn`;
});

playerVsComputerButton.addEventListener('click', () => {
    resetGame();
    gameMode = 'pvc';
    statusElement.textContent = `Player X's turn`;
});

resetButton.addEventListener('click', resetGame);

renderBoard();

