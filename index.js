// const tbody = document.getElementById("chess-body")
let selected = null;

const initialBoard = [
  ["♜", "♞", "♝", "♛", "♚", "♝", "♞", "♜"],
  ["♟", "♟", "♟", "♟", "♟", "♟", "♟", "♟"],
  ["", "", "", "", "", "", "", ""],
  ["", "", "", "", "", "", "", ""],
  ["", "", "", "", "", "", "", ""],
  ["", "", "", "", "", "", "", ""],
  ["♙", "♙", "♙", "♙", "♙", "♙", "♙", "♙"],
  ["♖", "♘", "♗", "♕", "♔", "♗", "♘", "♖"]
];

let board = new Proxy(initialBoard, {
    set(target, value, prop) {
        target[prop] = value
        renderBoard()
        return true
    },
    // get(target, property, receiver) {
    //     console.log("target, property, receiver --", target, property, receiver)
    // }
})

const chessboard = document.getElementById('chessboard');

function renderBoard() {
    chessboard.innerHTML = '';

    for (let row = 0; row < 8; row++) {
        for (let col = 0; col < 8; col++) {
            const cell = document.createElement('div');
            cell.className = `cell ${(row + col) % 2 === 0 ? 'white' : 'black'}`;
            cell.dataset.row = row;
            cell.dataset.col = col;
            cell.textContent = board[row][col];

            if (selected && selected.row === row && selected.col === col) {
            cell.classList.add('selected');
            }

            cell.addEventListener('click', () => handleClick(row, col));
            chessboard.appendChild(cell);
        }
    }
}

function handleClick(row, col) {
    let piece = board[row][col]
    if(selected) {
        if(selected.row === row && selected.col === col) {
            selected = null
        } else {
            board[selected.row][selected.col] = null
            board[row][col] = selected.piece
            selected = null
        }
    } else if(piece !== '') {
        selected = {row, col, piece}
        renderBoard()
    }
}
renderBoard()