// PROJECTOR

// IMAGE > ASPECT > V-ZOOM

// INSTALLATION > GEOMTERY CORRECTION > H/V KEYSTONE > V-KEYSTONE = -20

// CANVAS 850 1080 WEBGL


//////////////////////////
/* EDIT VALUES BELOW TO MATCH DEVICE SLIDERS*/
const CCSLIDER1 = 2;
const CCSLIDER2 = 3;
const CCSLIDER3 = 4;
const CCSLIDER4 = 5;
const CCSLIDER5 = 6;
const CCSLIDER6 = 8;
const CCSLIDER7 = 9;
const CCSLIDER8 = 12;
const CCSLIDER9 = 56;
const CCSLIDER10 = 86;
//blank data
const SLIDERDATA = [0,0,0,0,0,0,0,0,0];
let colours;
let r = 70;
//////////////////////////
// built in P5 function gets called at the beginning
function setup() {
    createCanvas(innerWidth, innerHeight, WEBGL);
    randomBreakUp = random(9) 
    stroke(255);
    strokeWeight(1);
    noFill();
    frameRate(12);

    WebMidi
        .enable()
        .then(onEnabled)
        .catch(err => alert(err));
}

// ===================================
// gets called by MIDI library once MIDI enabled
function onEnabled() {
    // Display available MIDI input devices
    if (WebMidi.inputs.length < 1) {

    } else {
        WebMidi.inputs.forEach((device, index) => {
            // console.log(`${index}: ${device.name}`);
        });
    }
    myController = WebMidi.inputs[0];
    myController.channels[1].addListener("noteon", noteOn);
    myController.channels[1].addListener("controlchange", allCC);

}
// gets called when a MIDI note its intercepted 
function noteOn(e) {
    // for APC Mini
    // console.log(e.note.name, e.note.accidental || null, e.note.octave);
    // calculate the postion of the note in the grid of notes
    let pos = returnXY(e.note.name, e.note.accidental || '', e.note.octave);
    // calculate the x y pixel equivalent 
    // add offset values to position in the middle of an notional 8 x8 grid cell
    // width / 16 = half of cell size
    let hSpace = width / 16;
    let vSpace = height / 16;
    let x = pos.x * width + hSpace;
    let y = pos.y * height + vSpace
    // TODO - use these values to draw something at the note position?
    // for example: circle(x, y, 20)
}
// gets called when a MIDI control change message is intercepted
function allCC(e) {
    // console.log(e.controller.number, e.data);
    let ratio = e.data[2] / 127
    switch (e.controller.number) {
        case CCSLIDER1: 
        SLIDERDATA[0] = ratio;
            break;
        case CCSLIDER2: 
        SLIDERDATA[1] = ratio;
            break;
        case CCSLIDER3: 
        SLIDERDATA[2] = ratio;
            break;
        case CCSLIDER4: 
        SLIDERDATA[3] = ratio;
            break;
        case CCSLIDER5: 
        SLIDERDATA[4] = ratio;
            break;
        case CCSLIDER6: 
        SLIDERDATA[5] = ratio;
            break;
        case CCSLIDER7: 
        SLIDERDATA[6] = ratio;
            break;
        case CCSLIDER8: 
        SLIDERDATA[7] = ratio;
            break;
        case CCSLIDER9:
            SLIDERDATA[8] = ratio;
            break;
        case CCSLIDER10:
            SLIDERDATA[9] = ratio;
    }}

    let scale;
    let resolution;
    let numPoints;
    let radius = 300;
    let numRings = 20;
    let lineBreak;
    let rotation;
    let spiral;
    let gradient;
  
  function draw() {
    noiseSeed(SLIDERDATA[6] * 100)
    let temp = SLIDERDATA[7];
    noiseSeed(50)
    scale  = map (SLIDERDATA[0],  0,  1,  -200,  200)
    numPoints = ceil(map (SLIDERDATA[1],  0,  1,  20, 50))
    lineBreak = map (SLIDERDATA[2],  0,  1,  2,  10)
    resolution = map (SLIDERDATA[3], 0, 1, 0.0019*temp, 0.015*temp);
    numRings = map (SLIDERDATA[4], 0, 1, 10, 25)
    rotation = SLIDERDATA[5]
    radius = map (SLIDERDATA[6], 0, 1, 300, 600)
    background(30);
    rotateX(rotation)
    gradient = map (SLIDERDATA[9], 0, 1, 30, 255)
    stroke(gradient)
    background(255 - gradient)
    for (r = 0; r < radius; r += radius / numRings) {
    strokeWeight(random(1,3))
    beginShape();
    //   for (a = -TAU/numPoints; a <= TAU+TAU/numPoints; a += TAU / numPoints) {
        for (a = 0; a <= TAU + 10; a += TAU / numPoints) {
        let x =  r * cos(a);
        let y = -r * sin(a);
  
        let n = map(noise(x * resolution, y * resolution), 0, 1, -scale, scale);

        curveVertex(x + n, y + n);
  
        if(random(9)>lineBreak){
          endShape();
          
          beginShape();
        } else{

        }
        
      }
      endShape();
    }

    // noLoop();
  }

