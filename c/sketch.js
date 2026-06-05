let column; let row;
let size = 20;
let grid = [];
let margin = 5;
let x; let y;

//////////////////////////
/* EDIT VALUES BELOW TO MATCH DEVICE SLIDERS*/
const CCSLIDER1 = 36;
const CCSLIDER2 = 37;
const CCSLIDER3 = 38;
const CCSLIDER4 = 39;
const CCKNOB1 = 32;
const CCKNOB2 = 33;
const CCKNOB3 = 34;
const CCKNOB4 = 35;
let myController;

//////////////////////////
// variables that correspond to controls
let r = 255;
let g = 255;
let b = 255;
let a = 255;
let shapeType = 0;
// let bw = 255;


//////////////////////////
// built in P5 function gets called at the beginning
function setup() {
    createCanvas(windowHeight - 50, windowHeight - 50);
    background(0);
    WebMidi
        .enable()
        .then(onEnabled)
        .catch(err => alert(err));

    column = width / size;
    row = height / size;

    //
    x = floor(random(column / 2 + margin, column / 2 - margin)); //column/2 is the vertical center
    y = floor(random(row / 2 + margin, row / 2 - margin)); //row/2 is the horizontal center

    //
    for (let i = 0; i < column; i++) {
        grid[i] = [];
        for (let j = 0; j < row; j++) {
            //changes the grid colour
            grid[i][j] = color(20); //2d array
        }
    }
}

// gets called when a MIDI control change message is intercepted
function customCC(e) {
    console.log("controller number = " + e.controller.number + ", value = " + e.data[2]);
    let ratio = e.data[2] / 127;
    switch (e.controller.number) {
        case CCSLIDER1:
            console.log('Slider 1 moved to "+ratio');
            r = 255 * ratio;
            break;
        case CCSLIDER2:
            g = 255 * ratio;
            break;
        case CCSLIDER3:
            b = 255 * ratio;
            break;
        case CCSLIDER4:
            a = 255 * ratio;
            break;
        case CCKNOB1:
            shapeType = ratio;
            break;
        case CCKNOB2:

            break;
        case CCKNOB3:

            break;
        case CCKNOB4:
            break;
    }
    doDraw(); //calling the draw function
}

function doDraw() {

    let dx = random([-1, -2, -3, 1, 2, 3]) + 3;
    let dy = random([-1, -2, -3, 1, 2, 3]) + 3;
    console.log(dx, dy)

    //stopping generation from outside the canvas
    if (x + dx < 0 || x + dx > column - 1) {
        dx = 0;
    }
    if (y + dy < 0 || y + dy > row - 1) {
        dy = 0;
    }

    x += dx;
    y += dy;

    //creating the symmetry quadrants
    let topLeft = createVector(x, y)
    let topRight = createVector(column - 1 - x, y)
    let bottomLeft = createVector(x, row - 1 - y)
    let bottomRight = createVector(column - 1 - x, row - 1 - y)

    console.log(topLeft, topRight, bottomLeft, bottomRight)

    //setting the colour of each cell by accessing the x y value for each variable
    let c = color(r, g, b, a);
    grid[floor(topLeft.x)][floor(topLeft.y)] = c;
    grid[floor(topRight.x)][floor(topRight.y)] = c;
    grid[floor(bottomLeft.x)][floor(bottomLeft.y)] = c;
    grid[floor(bottomRight.x)][floor(bottomRight.y)] = c;

    //creating the grid
    for (let i = 0; i < column; i++) {
        for (let j = 0; j < row; j++) {

            fill(grid[i][j]);
            noStroke();

            if (shapeType < 0.5) {
                ellipse(i * size + size/2, j * size + size/2, size, size);
            } else if (shapeType < 1) {
                rect(i * size, j * size, size, size);
            }

            // rect(i * size, j * size, size, size);
            // circle(i * size, j * size, size)
            // triangle(x-size/2, y+size/2, x, y-size/2, x+size/2, y+size/2);  
        }
    }

}
