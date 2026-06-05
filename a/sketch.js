//////////////////////////
/* EDIT VALUES BELOW TO MATCH DEVICE SLIDERS*/
const CCSLIDER1 = 32;
const CCSLIDER2 = 33;
const CCSLIDER3 = 34;
const CCSLIDER4 = 35;
const CCSLIDER5 = 36;
const CCSLIDER6 = 37;
const CCSLIDER7 = 38;
const CCSLIDER8 = 39;
//const CCSLIDER9 = 0;
let myController;
//////////////////////////
function preload() {
    font = loadFont('assets/DraftingMono-SemiBold.otf');
    leftData =  loadStrings('assets/left.txt');
    rightData = loadStrings('assets/right.txt');
}

// built in P5 function gets called at the beginning
function setup() {
    createCanvas(innerWidth, innerHeight);
    background(0);
    noStroke();
    fill("#00b8d2");
    textSize(canvas.width*0.018);
    textFont(font);
    textAlign(CENTER, CENTER);
    rectMode(CENTER);
    WebMidi
        .enable()
        .then(onEnabled)
        .catch(err => alert(err));
}

// adjustable values
let leftOpacity = 0;
let rightOpacity = 0;
let currentPhrase = 0;

// gets called when a MIDI control change message is intercepted
function customCC(e) {
    //console.log("controller number = "+e.controller.number+", value = "+ e.data[2]);
    let ratio = e.data[2] / 127
    switch (e.controller.number) {
        case CCSLIDER1: 
            currentPhrase = floor((leftData.length-2)*ratio);
            break;
        case CCSLIDER2: 
            leftOpacity = 255 * (ratio+0.5);
            rightOpacity = 255 * (1-ratio+0.5);
            break;
        case CCSLIDER3: 
            break;
        case CCSLIDER4: 
            break;
        case CCSLIDER5: 
            leftOpacity = 255 * (ratio+0.5);
            rightOpacity = 255 * (1-ratio+0.5);
            break;
        case CCSLIDER6: 
            currentPhrase = floor((leftData.length-2)*ratio);
            break;
        case CCSLIDER7:
            break;
        case CCSLIDER8: 
            break;
    }
}

function customDraw() {
    //background(36,64,244);
    //background(247,151,41);
    background(0);

    //let leftPhrase = leftData[floor(mouseX*((leftData.length-2)/(canvas.height/2)))];
    //let rightPhrase = rightData[floor(mouseX*((rightData.length-2)/(canvas.height/2)))];
    let leftPhrase = leftData[currentPhrase];
    let rightPhrase = rightData[currentPhrase];

    //fill(0,184,210,(mouseY+300)*0.425);
    fill(36,64,244,leftOpacity);
    text(leftPhrase, canvas.width/4, canvas.height/4, canvas.width-200, canvas.height-200);
    //fill(0,184,210,255-(mouseY-300)*0.425);
    fill(36,64,244,rightOpacity);
    text(rightPhrase, canvas.width/4, canvas.height/4, canvas.width-200, canvas.height-200);
}
