// grab container to store grid generated from this file
const gridContainer = document.getElementById('grid-container');

// grab and listen for CLASSIC BRUSH click
const classicBrush = document.getElementById('classic');
classicBrush.addEventListener('click', () => resetBrush(classicBrush.id));  // reset sketch-pad to CLASSIC

// grab and listen for COLOR BRUSH click
const colorBrush = document.getElementById('color-bg');
colorBrush.addEventListener('click', () =>  resetBrush(colorBrush.id));     // reset sketch-pad to COLOR

// grab and listen for SHADER BRUSH click
const shaderBrush = document.getElementById('shader');
shaderBrush.addEventListener('click', () => resetBrush(shaderBrush.id));    // reset sketch-pad to SHADER

// declare & initialize global variables
var currentBrush = classicBrush.id;                                         // set classic brush to load-default
var currentGridSize = 16;                                                   // set 16 to be squared for load-default
var opacity;                                                                // declare to initialice to each cell later



function createGrid(size) {

    
    size = (size > 64) ? 64 : (size < 0) ? 1 : size;                        // limit grid from 0 to 64^2

    gridContainer.style.gridTemplateColumns = `repeat(${size}, 1fr)`;       // adjust #grid-container css grid columns

    for (let i = 0; i < size ** 2; i++) {                                   // create cells of grid by squaring size given
        var gridCell = document.createElement('div');                       // create cell
        gridCell.classList.add('grid-cell');                                // style cell
        gridContainer.appendChild(gridCell);                                // append cell to grid
    }

    setBrush(currentBrush);                                                 // set currently selected brush
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




function resetBrush(brush) {                        // reset BRUSH from its given button-click

    currentBrush = brush;                           // update passed BRUSH to current

    removeGrid();                                   // remove all cells
    createGrid(currentGridSize);                    // remake grid with last stored size and current BRUSH
}




function resetGrid() {                              // on button-click, clear drawing and reset to blank grid

    getCells().forEach(cell => {

        if (currentBrush == classicBrush.id) {

            cell.classList.remove(currentBrush)     // remove CLASSIC BRUSH class from each cell
        }
        else {
            cell.removeAttribute("style");          // remove COLOR/SHADER BRUSH generated styling from each cell

            if (currentBrush == shaderBrush.id) {

                cell.style.opacity = "1";           // reset each cell to be opaque
            }
        }
    });
}




function resize(modal, size) {                      // pass new grid size to be created

    currentGridSize = size;                         // update current size from user-input

    createGrid(currentGridSize);                    // create grid from new size
    document.body.removeChild(modal);               // remove MODAL
}




function resizeGrid() {                             // on button-click
    
    removeGrid();                                   // remove all cells
    generateModal();                                // create pop-up MODAL
}



function setBrush(brush) {                          // set currently selected BRUSH

    if (currentBrush == shaderBrush.id)             // if SHADER
    {
        getCells().forEach(cell => {

            cell.style.opacity = "1";               // set each cell's opaque value
        });
    }
    
    getCells().forEach(cell => cell.addEventListener('mouseenter', () => {      // on entering cell

        if (currentBrush == classicBrush.id) {                                  // if CLASSIC 

            cell.classList.add('cell-enter');                                   // add transition style
        }
        else if (currentBrush == colorBrush.id) {                               // if COLOR
            cell.style.backgroundColor = randomRgb();                           // set background-color to a random RGB
        }
        else {                                                                  // if SHADER

            if (cell.style.opacity == 0) {                                      // if cell is transparent
                cell.style.backgroundColor = "black";                           // set background-color to black
            }
            else {
                cell.style.opacity -= 0.1;                                      // darken cell by 1/10th
            }
        }
    }));
    
    if (currentBrush == classicBrush.id) {                                      // if CLASSIC

        getCells().forEach(cell => cell.addEventListener('mouseleave', () => {  // on leaving cell
            
            cell.classList.add(brush);                                          // add transparent style
            cell.classList.remove('cell-enter');                                // remove transition style
        }));
    }
}



createGrid(currentGridSize);        // initialize DEFAULT grid for page load