function generateModal() {

    const modal = document.createElement('div');
    modal.classList.add('modal');

    const modalContent = document.createElement('div');
    modalContent.classList.add('modal-content');

    const span = document.createElement('span');
    span.classList.add('modal-close');
    span.innerHTML = "&times;";

    const div = document.createElement('div');

    const p = document.createElement('p');
    p.textContent = "Enter desired size of grid:";
    p.classList.add('fl-l');

    const input = document.createElement('input');
    input.type = "text";
    input.defaultValue = "16";
    p.classList.add('fl-l');

    div.innerHTML += p.outerHTML + input.outerHTML;
    modalContent.innerHTML += span.outerHTML + div.outerHTML;

    document.body.insertBefore(modal, document.body.firstChild);
    modal.appendChild(modalContent);

    var newSize = modalContent.querySelector('input');

    modalContent.querySelector('.modal-close').onclick = () => {

        createGrid(newSize.value);
        document.body.removeChild(modal);    }
}



function getCells () {
    return document.querySelectorAll('.grid-cell');
}



function resetGrid() {
    getCells().forEach(cell => cell.classList.remove('classic'));
}



function resizeGrid() {
    
    getCells().forEach(cell => cell.parentNode.removeChild(cell));

    generateModal();
}



function createGrid(size) {

    size = (size > 64) ? 64 : (size < 0) ? 1 : size;

    gridContainer.style.gridTemplateColumns = `repeat(${size}, 1fr)`;

    for (let i = 0; i < size ** 2; i++) {
        var gridCell = document.createElement('div');
        gridCell.classList.add('grid-cell');
        gridContainer.appendChild(gridCell);
    }

    getCells().forEach(cell => cell.addEventListener('mouseenter', () => cell.classList.add('cell-enter')));
    getCells().forEach(cell => cell.addEventListener('mouseleave', () => {
        cell.classList.add('classic');
        cell.classList.remove('cell-enter');
    }));
}







const gridContainer = document.getElementById('grid-container');

// let brushes = document.getElementById('brush');

// console.log(brushes);

const defaultGridSize = 16;



createGrid(defaultGridSize);