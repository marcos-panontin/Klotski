// Setting initial variables
let boardSize = 16;
let cellsArray = [];
let movements = 0;
let timerStarted = false;
let timerInterval;

// Selecting DOM elements
const board = document.querySelector(".board");
const boardSizeSelect = document.getElementById('boardSizeSelect');
const newBoardButton = document.getElementById('new-board');
const minutesLabel = document.getElementById("minutes");
const secondsLabel = document.getElementById("seconds");

// TIMER
let totalSeconds = 0;


const startTimer = () => {
  console.log('entrou na startTimer');
  totalSeconds = 0;
  // setInterval(setTime, 1000);
  timerInterval = setInterval(setTime, 1000);
}

const clearTimer = () => {
  timerStarted = false;
  totalSeconds = 0;
  clearInterval(timerInterval)
  secondsLabel.innerHTML = pad(totalSeconds % 60) + 's';
  minutesLabel.innerHTML = pad(parseInt(totalSeconds / 60)) + 'min';
}


function setTime() {
  console.log('entrou na setTime');
  totalSeconds += 1;
  secondsLabel.innerHTML = pad(totalSeconds % 60) + 's';
  minutesLabel.innerHTML = pad(parseInt(totalSeconds / 60)) + 'min';
}

function pad(val) {
  let valString = val + "";
  if (valString.length < 2) {
    return "0" + valString;
  } else {
    return valString;
  }
}

// CREATING THE INITIAL GAME STATE

const isCellAdjacentToEmpty = (clickedCell, emptyCell) => {
  let sameRow = clickedCell.dataset.row === emptyCell.dataset.row;
  let sameColumn = clickedCell.dataset.column === emptyCell.dataset.column;
  let rowDifferenceOne = Math.abs(clickedCell.dataset.row - emptyCell.dataset.row) === 1;
  let columnDifferenceOne = Math.abs(clickedCell.dataset.column - emptyCell.dataset.column) === 1;
  if ((sameRow && columnDifferenceOne) || (sameColumn && rowDifferenceOne)) {
    return true;
  } else {
    return false;
  }
}

const checkCurrentBoard = () => {
  const cells = Array.from(document.querySelectorAll('.cell'));
  currentBoard = [];
  let row = 1;
  let col = 1;
  for (let cell of cells) {

  const number = cells.find((cell) => parseInt(cell.dataset.row) === row && parseInt(cell.dataset.column) === col).dataset.cell;
  currentBoard.push(parseInt(number) || 0);
    col += 1;
    if (col > Math.sqrt(boardSize)) {
      row += 1;
      col = 1;
    }    
  }
  return currentBoard;
}

const checkWin = () => {

  const currentBoard = checkCurrentBoard();

  if (currentBoard[currentBoard.length - 1] === 0) {
    currentBoard.pop();
    if (JSON.stringify(currentBoard) === JSON.stringify(currentBoard.sort((a, b) => a - b))) {
      Swal.fire(`Vitória em ${movements} movimentos em ${totalSeconds} segundos.`)
    }
  }
  clearTimer();
}

const swapCells = (clickedCell, emptyCell) => {
  movements += 1;
  const temporaryRow = clickedCell.dataset.row;
  const temporaryColumn = clickedCell.dataset.column;
// Changing the position of the clicked cell
  clickedCell.style.gridRow = emptyCell.dataset.row;
  clickedCell.dataset.row = emptyCell.dataset.row;
  clickedCell.style.gridColumn = emptyCell.dataset.column;
  clickedCell.dataset.column = emptyCell.dataset.column;
// Changing the position of the empty cell
  emptyCell.style.gridRow = temporaryRow;
  emptyCell.dataset.row = temporaryRow;
  emptyCell.style.gridColumn = temporaryColumn;
  emptyCell.dataset.column = temporaryColumn;

}

const handleClick = (event) => {
  
  if (event.target.classList.contains('cell')) {
    if (!timerStarted) {
      timerStarted = true;
      startTimer()
    }
    const emptyCell = document.querySelector('.emptyCell');
    const clickedCell = event.target;

    // Check if the clicked cell is adjacent to the empty cell
    if (isCellAdjacentToEmpty(clickedCell, emptyCell)) {
      // Swap the clicked cell with the empty cell
      swapCells(clickedCell, emptyCell);
        checkWin();
    }
      }  
  };


const generateNumbers = () => {
  const numbers = [];
  for (let i = 1; i < boardSize; i += 1) {
    numbers.push(i);
  }
  return numbers;
}

const checkViabilityofBoard = () => {
// checking if the board is solvable
  const cellsNumbers = cellsArray.map((cell) => cell.dataset.cell);
  let inversions = 0;
  for (let i = 0; i < cellsNumbers.length; i += 1) {
    for (let j = i + 1; j < cellsNumbers.length; j += 1) {
      if (cellsNumbers[i] > cellsNumbers[j]) {
        inversions += 1;
      }
    }
  }
  // if the boardsize is odd and the number of inversions is odd, generate a new board
  if (Math.sqrt(boardSize) % 2 !== 0 && inversions % 2 !== 0) {
    // console.log('ODD - Board is not solvable');
    generateBoard();
    // if the boardsize is even and the number of (inversions + emptyCellRow) is even, generate a new board
  } else if (Math.sqrt(boardSize) % 2 === 0 && (inversions + Math.sqrt(boardSize) - 1) % 2 === 0) {
    // console.log('EVEN - Board is not solvable');
    generateBoard();
  }

}

const generateBoard = () => {
  clearTimer();
  board.innerHTML = '';
  movements = 0;

  cellsArray = [];

  // setting the board dinamically
  board.style.gridTemplateColumns = `repeat(${Math.sqrt(boardSize)}, 1fr)`;
  board.style.gridTemplateRows = `repeat(${Math.sqrt(boardSize)}, 1fr)`;

  const numbers = generateNumbers();
  let row = 1;
  let col = 1;
  
  // CREATING THE BOARD
  for (let i = 0; i < boardSize - 1; i += 1) {
    const cell = document.createElement('div');
    cell.classList.add('cell');
    board.appendChild(cell);
    const randomIndex = Math.floor(Math.random() * numbers.length);
    cell.dataset.cell = numbers[randomIndex];
    cell.textContent = numbers[randomIndex];
    numbers.splice(randomIndex, 1);

// CREATING ROWS AND COLUMNS DATA
    if (col > Math.sqrt(boardSize)) {
      row += 1;
      col = 1;
    }
    cell.dataset.row = row;
    cell.dataset.column = col;
    col += 1;

    cellsArray.push(cell)
  }

  
  // CREATING THE EMPTY CELL
  const emptyCell = document.createElement('div');
  emptyCell.classList.add('cell');
  emptyCell.classList.add('emptyCell');
  board.appendChild(emptyCell);
  emptyCell.dataset.row = Math.sqrt(boardSize);
  emptyCell.dataset.column = Math.sqrt(boardSize);

  // Checking if board is solvable
  checkViabilityofBoard();
  
}

generateBoard();


document.addEventListener('click', handleClick);
// document.addEventListener('mousedown', handleClick);

boardSizeSelect.addEventListener('change', (event) => {
  boardSize = event.target.value;
  generateBoard();
});

newBoardButton.addEventListener('click', generateBoard)