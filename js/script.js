



const container = document.getElementById('container');

let gridSize = {default: 16, set: 0};


for (let i = 0; i < gridSize.default ** 2; i++) {
    const gridCell = document.createElement('div');
    gridCell.classList.add('grid-cell');
    container.appendChild(gridCell);
}

const cells = document.querySelectorAll('.grid-cell');
cells.forEach(cell => cell.addEventListener('mouseenter', () => cell.classList.add('cell-enter')));
cells.forEach(cell => cell.addEventListener('mouseleave', () => {
    cell.classList.add('cell-leave');
    cell.classList.remove('cell-enter');
}));
