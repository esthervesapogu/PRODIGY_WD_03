let currentPlayer = 'X';
let board = ['', '', '', '', '', '', '', '', ''];
let gameActive = true;

function handleCellClick(index) {
  if (board[index] === '' && gameActive) {
    board[index] = currentPlayer;
    document.getElementById(`cell-${index}`).innerText = currentPlayer;
    
    if (checkWinner()) {
      document.getElementById('result').innerText = `Player ${currentPlayer} wins!`;
      gameActive = false;
    } else if (board.every(cell => cell !== '')) {
      document.getElementById('result').innerText = "It's a tie!";
      gameActive = false;
    } else {
      currentPlayer = currentPlayer === 'X' ? 'O' : 'X';
    }
  }
}

function checkWinner() {
  const winPatterns = [
    [0, 1, 2], [3, 4, 5], [6, 7, 8], // Rows
    [0, 3, 6], [1, 4, 7], [2, 5, 8], // Columns
    [0, 4, 8], [2, 4, 6]             // Diagonals
  ];

  return winPatterns.some(pattern =>
    pattern.every(index => board[index] === currentPlayer)
  );
}

function resetGame() {
  currentPlayer = 'X';
  board = ['', '', '', '', '', '', '', '', ''];
  gameActive = true;

  // Clear board display
  const cells = document.getElementsByClassName('cell');
  Array.from(cells).forEach(cell => {
    cell.innerText = '';
  });

  // Clear result display
  document.getElementById('result').innerText = '';
}

// Dynamically generate the Tic Tac Toe board
const boardContainer = document.getElementById('board');
for (let i = 0; i < 9; i++) {
  const cell = document.createElement('div');
  cell.className = 'cell';
  cell.id = `cell-${i}`;
  cell.addEventListener('click', () => handleCellClick(i));
  boardContainer.appendChild(cell);
}
