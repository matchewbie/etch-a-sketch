// grab container to store grid generated from this file
const gridContainer = document.getElementById('grid-container');
gridContainer.addEventListener('mousedown', addListeners);
gridContainer.addEventListener('mouseup', removeListeners);
gridContainer.addEventListener('contextmenu', e => e.preventDefault());

// grab and listen for BLACK BRUSH click
const classicBrush = document.getElementById('classic');
classicBrush.addEventListener('click', () => resetBrush(classic));          // reset sketch-pad to CLASSIC

// grab and listen for RANDOM BRUSH click
const colorBrush = document.getElementById('colorBg');
colorBrush.addEventListener('click', () =>  resetBrush(colorBg));           // reset sketch-pad to COLOR

// grab and listen for SHADER BRUSH click
const shaderBrush = document.getElementById('shader');
shaderBrush.addEventListener('click', () => resetBrush(shader));            // reset sketch-pad to SHADER

// grab and listen for ERASER BRUSH click
const eraserBrush = document.getElementById('erase');
eraserBrush.addEventListener('click', () => resetBrush(eraser));

// declare & initialize global variables
var currentBrush = classic;                                                 // set classic brush to load-default
var currentGridSize = 16;                                                   // set 16 to be squared for load-default



function addListeners() {                                                   // add listeners for current brush
    getCells().forEach(cell => cell.addEventListener('mouseenter', currentBrush));
}



function classic() {                                                        // BLACK BRUSH

    this.style.backgroundColor = "black";                                   // add black background to cell
}



function colorBg() {                                                        // RANDOM BRUSH

    this.style.backgroundColor = randomRgb();                               // add random RGB background to cell
}



function createGrid(size) {

    
    size = (size > 64) ? 64 : (size < 0) ? 1 : size;                        // limit grid from 0 to 64^2

    gridContainer.style.gridTemplateColumns = `repeat(${size}, 1fr)`;       // adjust #grid-container css grid columns

    for (let i = 0; i < size ** 2; i++) {                                   // create cells of grid by squaring size given
        var gridCell = document.createElement('div');                       // create cell
        gridCell.classList.add('grid-cell');                                // style cell
        gridCell.style.opacity = "1";                                       // set cell opacity level to opaque
        gridCell.draggable = false;
        gridContainer.appendChild(gridCell);                                // append cell to grid
    }

    // setBrush();                                                             // set currently selected brush
}



function eraser() {                                         // ERASER BRUSH

    this.removeAttribute("style");                          // remove BRUSH generated styling from each cell
    this.style.opacity = "1";                               // add opaque style to cell
}



function generateModal() {                                  // generate and display modal instead of project-suggested prompt pop-up

    const modal = document.createElement('div');            // create full-page modal container as DIV
    modal.classList.add('modal');                           // add style

    const modalContent = document.createElement('div');     // create content container as DIV
    modalContent.classList.add('modal-content');            // add style

    const modalClose = document.createElement('span');      // create × container as SPAN
    modalClose.classList.add('modal-close');                // add style (transitions to +)
    modalClose.innerHTML = "&times;";                       // place × symbol in it's container

    const div = document.createElement('div');              // create container for the next three elements as DIV

    const p = document.createElement('p');                  // create text container as P
    p.textContent = "Enter desired grid-size:";             // add the text in P
    p.classList.add('fl-l');                                // add float-left style

    const input = document.createElement('input');          // create user-input
    input.type = "text";                                    // set input type
    input.defaultValue = "16";                              // set default size if no input given
    p.classList.add('fl-l');                                // add float-left style

    const squared = document.createElement('sup');          // create superscript for SQUARED visual
    squared.textContent = "2";                              // add "2" between superscript tags
    squared.classList.add('squared');                       // add style

    div.innerHTML += p.outerHTML + input.outerHTML + squared.outerHTML;     // assemble HTML of previous three elements into DIV
    modalContent.innerHTML += modalClose.outerHTML + div.outerHTML;         // assemble HTML of × container and previous DIV

    document.body.insertBefore(modal, document.body.firstChild);            // insert MODAL container into BODY above all else
    modal.appendChild(modalContent);                                        // append assembled HTML to MODAL container

    var newSize = modalContent.querySelector('input');                      // grab user-input

    newSize.addEventListener('keypress', e => {                             // listen for pressed key within user-input

        var key = e.which || e.keyCode;                                     // store pressed key
        if (key === 13) {                                                   // if stored key is ENTER key
            
            resize(modal, Math.round(newSize.value));                       // pass size & modal (for removal after resize)
        }
    });
    
    modalContent.querySelector('.modal-close').onclick = () => {            // if × (~ +) is clicked (instead of ENTER key)

        resize(modal, Math.round(newSize.value));                           // pass size & modal (for removal after resize)    

    }
}




function generateOnloadModal() {

    const modal = document.createElement('div');
    modal.classList.add('modal');

    const modalContent = document.createElement('div');
    modalContent.classList.add('modal-content');

    const modalClose = document.createElement('span');
    modalClose.classList.add('modal-close');
    modalClose.innerHTML = "&times;";

    const div = document.createElement('div');

    const h3 = document.createElement('h3');
    h3.textContent = "Hold down mouse button to draw!";

    const h4 = document.createElement('h4');
    h4.textContent = 'RESIZE to change "pixel" size.';

    div.innerHTML += h3.outerHTML + h4.outerHTML;
    modalContent.innerHTML += modalClose.outerHTML + div.outerHTML;

    document.body.insertBefore(modal, document.body.firstChild);
    modal.appendChild(modalContent);
    
    modalContent.querySelector('.modal-close').onclick = () => {

        document.body.removeChild(modal);

    }
}



function getCells () {                                              // grab all cells

    return document.querySelectorAll('.grid-cell');
}




function randomRgb() {                                              // generate random RGB values
    var r = Math.floor(Math.random() * 256);
    var g = Math.floor(Math.random() * 256);
    var b = Math.floor(Math.random() * 256);

    return `rgb(${r}, ${g}, ${b})`;                                 // return RGB for css
}




function removeGrid() {                                             // remove all cells from grid
    getCells().forEach(cell => cell.parentNode.removeChild(cell));  // remove each cell from it's parent
}



function removeListeners() {                                        // remove listeners for current brush
    getCells().forEach(cell => cell.removeEventListener('mouseenter', currentBrush));
}



function resetBrush(brush) {                        // reset BRUSH from its given button-click

    // removeListeners();                              // remove current BRUSH listeners

    currentBrush = brush;                           // update current BRUSH to newly selected

    // setBrush();                                     // set current BRUSH

}




function resetGrid() {                              // RESET BUTTON
    
    getCells().forEach( cell => {

        cell.removeAttribute("style");              // remove BRUSH generated styling from each cell
        cell.style.opacity = "1";                   // add opaque style to cell
    });
}



function resize(modal, size) {                      // pass new grid size to be created

    currentGridSize = size;                         // update current size from user-input

    createGrid(currentGridSize);                    // create grid from new size
    document.body.removeChild(modal);               // remove MODAL
}



function resizeGrid() {                             // RESIZE BUTTON
    
    removeGrid();                                   // remove all cells
    generateModal();                                // create pop-up MODAL
}



// function setBrush() {                               // set newly selected current BRUSH
    
//     addListeners();                                 // add listeners for current BRUSH
// }



function shader() {                                 // SHADER BRUSH

    if (this.style.backgroundColor == "black") {    // if background already black
        return;                                     // don't shade
    }
    else if (this.style.opacity == 0) {             // if cell is transparent

        this.style.backgroundColor = "black";       // set background-color to black
    }
    else {                                          // otherwise
        this.style.opacity -= 0.1;                  // darken cell by 1/10th
    }
}



createGrid(currentGridSize);                        // initialize DEFAULT grid for page load
generateOnloadModal();