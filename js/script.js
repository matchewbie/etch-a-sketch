const gridContainer = document.getElementById('grid-container');

const classicBrush = document.getElementById('classic');
classicBrush.addEventListener('click', () => resetBrush(classicBrush.id));

const colorBrush = document.getElementById('color-bg');
colorBrush.addEventListener('click', () =>  resetBrush(colorBrush.id));

const shaderBrush = document.getElementById('shader');
shaderBrush.addEventListener('click', () => resetBrush(shaderBrush.id));

var currentBrush = classicBrush.id;
var opacity;

var currentGridSize = 16;



function createGrid(size) {

    size = (size > 64) ? 64 : (size < 0) ? 1 : size;

    gridContainer.style.gridTemplateColumns = `repeat(${size}, 1fr)`;

    for (let i = 0; i < size ** 2; i++) {
        var gridCell = document.createElement('div');
        gridCell.classList.add('grid-cell');
        gridContainer.appendChild(gridCell);
    }

    setBrush(currentBrush);    
}



function generateModal() {

    const modal = document.createElement('div');
    modal.classList.add('modal');

    const modalContent = document.createElement('div');
    modalContent.classList.add('modal-content');

    const modalClose = document.createElement('span');
    modalClose.classList.add('modal-close');
    modalClose.innerHTML = "&times;";

    const div = document.createElement('div');

    const p = document.createElement('p');
    p.textContent = "Enter desired grid-size:";
    p.classList.add('fl-l');

    const input = document.createElement('input');
    input.type = "text";
    input.defaultValue = "16";
    p.classList.add('fl-l');

    const squared = document.createElement('sup');
    squared.textContent = "2";
    squared.classList.add('squared');

    div.innerHTML += p.outerHTML + input.outerHTML + squared.outerHTML;
    modalContent.innerHTML += modalClose.outerHTML + div.outerHTML;

    document.body.insertBefore(modal, document.body.firstChild);
    modal.appendChild(modalContent);

    var newSize = modalContent.querySelector('input');

    newSize.addEventListener('keypress', e => {

        var key = e.which || e.keyCode;
        if (key === 13) {
            
            resize(modal, Math.round(newSize.value));
        }
    });
    
    modalContent.querySelector('.modal-close').onclick = () => {

        resize(modal, Math.round(newSize.value));

    }
}



function getCells () {
    return document.querySelectorAll('.grid-cell');
}



function randomRgb() {
    var r = Math.floor(Math.random() * 256);
    var g = Math.floor(Math.random() * 256);
    var b = Math.floor(Math.random() * 256);

    return `rgb(${r}, ${g}, ${b})`;
}



function removeGrid() {
    getCells().forEach(cell => cell.parentNode.removeChild(cell));
}



function resetBrush(brush) {

    currentBrush = brush;

    removeGrid();
    createGrid(currentGridSize);
}



function resetGrid() {

    getCells().forEach(cell => {

        if (currentBrush == classicBrush.id) {

            cell.classList.remove(currentBrush)
        }
        else {
            cell.removeAttribute("style");

            if (currentBrush == shaderBrush.id) {

                cell.style.opacity = "1";
            }
        }
    });
}



function resize(modal, size) {

    currentGridSize = size;

    createGrid(currentGridSize);
    document.body.removeChild(modal);
}



function resizeGrid() {
    
    removeGrid();
    generateModal();
}



function setBrush(brush) {

    if (currentBrush == shaderBrush.id)
    {
        getCells().forEach(cell => {

            cell.style.opacity = "1";
        });
    }
    
    getCells().forEach(cell => cell.addEventListener('mouseenter', () => {

        if (currentBrush == classicBrush.id) {

            cell.classList.add('cell-enter')
        }
        else if (currentBrush == colorBrush.id) {
            cell.style.backgroundColor = randomRgb();
        }
        else {

            if (cell.style.opacity <= 0) {
                cell.style.backgroundColor = "black";
            }
            else {
                cell.style.opacity -= 0.1;
            }
        }
    }));
    
    if (currentBrush == classicBrush.id) {

        getCells().forEach(cell => cell.addEventListener('mouseleave', () => {
            
            cell.classList.add(brush);
            cell.classList.remove('cell-enter');
        }));
    }
}



createGrid(currentGridSize);