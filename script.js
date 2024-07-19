const boardSize = 10;
const gameBoard = document.getElementById('game-board');
let playerPosition = { x: 0, y: 0 };
let endPosition = { x: 9, y: 9 };

const maze = [
    ['S', 'P', 'P', 'P', 'P', 'P', 'P', 'P', 'P', 'P'],
    ['W', 'W', 'W', 'W', 'P', 'W', 'W', 'W', 'W', 'P'],
    ['P', 'P', 'P', 'W', 'P', 'P', 'P', 'W', 'P', 'P'],
    ['P', 'W', 'P', 'W', 'P', 'W', 'P', 'W', 'P', 'W'],
    ['P', 'W', 'P', 'P', 'P', 'W', 'P', 'P', 'P', 'W'],
    ['P', 'W', 'W', 'W', 'P', 'W', 'W', 'W', 'P', 'W'],
    ['P', 'P', 'P', 'P', 'P', 'P', 'P', 'W', 'P', 'P'],
    ['W', 'W', 'W', 'W', 'W', 'W', 'P', 'W', 'P', 'W'],
    ['P', 'P', 'P', 'P', 'P', 'P', 'P', 'W', 'P', 'P'],
    ['P', 'W', 'W', 'W', 'W', 'W', 'W', 'W', 'P', 'E'],
];

function createBoard() {
    gameBoard.innerHTML = '';
    for (let y = 0; y < boardSize; y++) {
        for (let x = 0; x < boardSize; x++) {
            const cell = document.createElement('div');
            cell.classList.add('cell');
            if (maze[y][x] === 'W') {
                cell.classList.add('wall');
            } else if (maze[y][x] === 'P') {
                cell.classList.add('path');
            } else if (maze[y][x] === 'S') {
                cell.classList.add('start');
                cell.classList.add('player');
                playerPosition = { x, y };
            } else if (maze[y][x] === 'E') {
                cell.classList.add('end');
                endPosition = { x, y };
            }
            cell.dataset.x = x;
            cell.dataset.y = y;
            gameBoard.appendChild(cell);
        }
    }
}

function movePlayer(dx, dy) {
    const newX = playerPosition.x + dx;
    const newY = playerPosition.y + dy;
    if (newX >= 0 && newX < boardSize && newY >= 0 && newY < boardSize && maze[newY][newX] !== 'W') {
        const oldCell = document.querySelector(`.cell[data-x="${playerPosition.x}"][data-y="${playerPosition.y}"]`);
        oldCell.classList.remove('player');

        playerPosition.x = newX;
        playerPosition.y = newY;

        const newCell = document.querySelector(`.cell[data-x="${newX}"][data-y="${newY}"]`);
        newCell.classList.add('player');

        if (playerPosition.x === endPosition.x && playerPosition.y === endPosition.y) {
            alert('Você venceu!');
            createBoard();
        }
    }
}

document.addEventListener('keydown', (e) => {
    switch (e.key) {
        case 'ArrowUp':
            movePlayer(0, -1);
            break;
        case 'ArrowDown':
            movePlayer(0, 1);
            break;
        case 'ArrowLeft':
            movePlayer(-1, 0);
            break;
        case 'ArrowRight':
            movePlayer(1, 0);
            break;
    }
});

createBoard();
