let group = 'b';

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
//const CCSLIDER9 = 12;
const sliderData = [0.5,0.2,0.2,0.3,0.2,0.2,0,0.2];

// To store an array of particle objects
let particles = [];
// Number of particles
const num = 1000;
// List of color array
const colors = ["#EEEEEE", "#32E0C4", "#0D7377", "#212121", "#33C6FF"]; 

// Scale factor for noise function
const noiseScale = 0.20 / 50;
// Adjusting the swirl effect factor
const swirlFactor = 0.20; 

function setup() {
    // Using the window width and height to create the canvas so it is full screen
  createCanvas(innerWidth,innerHeight);
  
  setupController();
  
  for (let i = 0; i < num; i++) {
    particles.push({
        // Initialising the particle position vector with random x and y coordinates within the canvas
      position: createVector(random(width), random(height)),
      // Randomly select a color from the colors array
      color: color(random(colors)) 
    

    });
  }

  noStroke(); 
  // no controller hack
  // sliderData[0] = 0.7;
  // sliderData[1] = 0.5;
  // sliderData[2] = 0.5;
  // sliderData[3] = 0.5;
  // sliderData[4] = 0.8;
  // sliderData[5] = 0.9;
  // sliderData[6] = 0.1;
  // sliderData[7] = 0.9;
}
// gets called when a MIDI control change message is intercepted
function customCC(e) {
  // console.log(e.data[2]);
  // calculate slider data as a value  0 to  1
  let ratio = e.data[2] /  127;
  switch (e.controller.number) {
      case CCSLIDER1:  
          sliderData[0] = ratio;
          break;
      case CCSLIDER2:  
          sliderData[1] = ratio;
          break;
      case CCSLIDER3:  
          sliderData[2] = ratio;
          break;
      case CCSLIDER4:  
          sliderData[3] = ratio;
          break;
      case CCSLIDER5:  
          sliderData[4] = ratio;
          break;
      case CCSLIDER6:  
          sliderData[5] = ratio;
          break;
      case CCSLIDER7:  
          sliderData[6] = ratio;
          break;
      case CCSLIDER8:  
          sliderData[7] = ratio;
          break;
  }
}
function draw() {
  background(0, 10);

  
  for (let i = 0; i < num; i++) {
    // Getting the current particle object
    let p = particles[i];
    // Color fill for particle
    //fill(sliderData[0]* 255,sliderData[1]* 255,sliderData[2]* 255); 
    fill(sliderData[1]* 500,sliderData[2]* 500,sliderData[3]* 500); 
    // Drawn an ellipse at the particle's position for visualisation 
    ellipse(p.position.x, p.position.y, 10 * sliderData[0]);

    // Calculate noise value for current particle's position and frame count
    let n = noise(p.position.x * noiseScale + sliderData[7], p.position.y * noiseScale + sliderData[7], frameCount * noiseScale * noiseScale + sliderData[7]);
    n = n * sliderData[5];
    // Apply swirl effect factor by calculating the angle of swirl based on noise value and frame count
    let angle = TAU * n + frameCount * swirlFactor * sliderData[6]; 
    // Calculating the radius with variation using noise function and the frame count
    let radius = 3 + 20 * noise(frameCount * 0.01 + i); 
    // Updating the particle's position by moving it with swirling effect
    p.position.x += cos(angle) * radius * sliderData[4]; 
    p.position.y += sin(angle) * radius * sliderData[4];
  
    // Checking if particles is off-screen, if true, reset its position to a random location within canvas
    if (!onScreen(p.position)) {
      p.position.x = random(width);
      p.position.y = random(height);
    }
  }
  // rect(0, 0, width, height);
  // line(width/2, width, height/2);
  
}

// Function to check if a vector is within the canvas boundaries 
function onScreen(v) {
  return v.x >= 0 && v.x <= width && v.y >= 0 && v.y <= height;
}
