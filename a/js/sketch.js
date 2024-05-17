let group = 'a';

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
const SLIDERDATA = [0, 0, 0, 0, 0, 0, 0, 0, 0];
let colours;
let r = 70;
//////////////////////////
// built in P5 function gets called at the beginning
function setup() {
  createCanvas(innerWidth, innerHeight, WEBGL);
  randomBreakUp = random(9);
  stroke(255);
  strokeWeight(1);
  noFill();
  frameRate(12);

  setupController();
}

// gets called when a MIDI control change message is intercepted
function customCC(e) {
  // console.log(e.controller.number, e.data);
  let ratio = e.data[2] / 127;
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
  }
}

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
  noiseSeed(SLIDERDATA[6] * 100);
  let temp = SLIDERDATA[7];
  noiseSeed(50);
  scale = map(SLIDERDATA[0], 0, 1, -200, 200);
  numPoints = ceil(map(SLIDERDATA[1], 0, 1, 20, 50));
  lineBreak = map(SLIDERDATA[2], 0, 1, 2, 10);
  resolution = map(SLIDERDATA[3], 0, 1, 0.0019 * temp, 0.015 * temp);
  numRings = map(SLIDERDATA[4], 0, 1, 10, 25);
  rotation = SLIDERDATA[5];
  radius = map(SLIDERDATA[6], 0, 1, 300, 600);
  background(30);
  rotateX(rotation);
  gradient = map(SLIDERDATA[9], 0, 1, 30, 255);
  stroke(gradient);
  background(255 - gradient);
  for (r = 0; r < radius; r += radius / numRings) {
    strokeWeight(random(1, 3));
    beginShape();
    //   for (a = -TAU/numPoints; a <= TAU+TAU/numPoints; a += TAU / numPoints) {
    for (a = 0; a <= TAU + 10; a += TAU / numPoints) {
      let x = r * cos(a);
      let y = -r * sin(a);

      let n = map(noise(x * resolution, y * resolution), 0, 1, -scale, scale);

      curveVertex(x + n, y + n);

      if (random(9) > lineBreak) {
        endShape();

        beginShape();
      } else {
      }
    }
    endShape();
  }

  // noLoop();
}
