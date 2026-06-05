//////////////////////////
/* EDIT VALUES BELOW TO MATCH DEVICE SLIDERS*/
const CCSLIDER1 = 36;
const CCSLIDER2 = 37;
const CCSLIDER3 = 38;
const CCSLIDER4 = 39;
const CCNOB1 = 32;
const CCNOB2 = 33;
const CCNOB3 = 34;
const CCNOB4 = 35;
let myController;
// variables that correspond to MIDI controls 
let size, r, g, b, a, strokeW, shapeType = 0;

//////////////////////////
// built in P5 function gets called at the beginning
function setup() {
    createCanvas(innerWidth, innerHeight);
    frameRate(24);
    background(0);
    WebMidi
        .enable()
        .then(onEnabled)
        .catch(err => alert(err));
}

// gets called when a MIDI control change message is intercepted
function customCC(e) {
    console.log("controller number = " + e.controller.number + ", value = " + e.data[2]);
    let ratio = e.data[2] / 127
    switch (e.controller.number) {
        case CCSLIDER1:
            console.log("Slider 1 moved to " + ratio);
            inc = 10 * ratio;
            break;
        case CCSLIDER2:
            r = 255 * ratio;
            break;
        case CCSLIDER3:
            g = 255 * ratio;
            break;
        case CCSLIDER4:
            b = 255 * ratio;
            break;
        case CCNOB1:
            a = 255 * ratio;
            break;
        case CCNOB2:
            strokeW = 5 * ratio;
            break;
        case CCNOB3:
            shapeType = ratio;
            break;
        case CCNOB4:
            break;
    }

}
// gets triggered when the space bar is pressed
// function keyPressed() {
//     if (key == ' ') {
//         drawShape(random(width), random(height))
//     }
// }
// function drawShape(x, y) {
//     strokeWeight(strokeW);
//     fill(r, g, b, a);
//     if (shapeType < .33) {
//         circle(x, y, size);
//     } else if (shapeType < .66) {
//         square(x, y, size);
//     } else if (shapeType < 1)
//         triangle(x - size / 2, y + size / 2, x, y - size / 2, x + size, y + size / 2);
// }
// function draw() {
//     background(0, 50);
//     for (let i = 0; i < 100; i++) {
//         drawShape(random(width), random(height))
//     }
// }

let n;
let offset = 0;
let x1; let y1;
let x2; let y2;
let x3; let y3;
let x4; let y4;

function customDraw() {
    stroke(g, b, r);
    strokeWeight(strokeW);
    fill(r, g, b, a);
    x1 = noise(offset + 5) * width;
    x2 = noise(offset + 10) * width;
    x3 = noise(offset + 15) * width;
    x4 = noise(offset + 20) * width;
    y1 = noise(offset + 25) * height;
    y2 = noise(offset + 30) * height;
    y3 = noise(offset + 35) * height;
    y4 = noise(offset + 40) * height;
    offset += 0.01;

    bezier(x1, y1, x2, y2, x3, y3, x4, y4)
}