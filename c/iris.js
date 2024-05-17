let inc = 0.1;
let scl = 5; //vector scale
let cols, rows;
let zoff = 0;
let particles = [];
let flowfield;
let backgroundColor = "#000000";
let lastParticleTime = 0; // Time of the last particle generation
let particleGenerationInterval = 4500; // Interval in milliseconds 
const particleAmount = 900;
const ATTRACTION_STRENGTH = 1;
let pgIris;




function setupIris() {
  pgIris = createGraphics(windowWidth, windowHeight);
  // create grid
  cols = floor(windowWidth / scl);
  rows = floor(windowHeight / scl);

  flowfield = new Array(cols * rows);


  globalParticlePositions = [];

  for (var i = 0; i < particleAmount; i++) {
    var posX, posY;
    do {
      posX = random(windowWidth);
      posY = random(windowHeight);
    } while (dist(posX, posY, windowWidth / 2, windowHeight / 2) <= 50);

    // Add a small random offset to the position
    posX += random(-10, 10); // Adjust the range as needed
    posY += random(-10, 10); // Adjust the range as needed

    particles[i] = null;

    particles[i] = new Particle(createVector(posX, posY));
  }
  pgIris.background(backgroundColor);
}

function drawIris() {
  // background(0,100);
  pgIris.background(0, 3);
  // Check if enough time has passed since the last particle generation
  var currentTime = millis();
  if (currentTime - lastParticleTime >= particleGenerationInterval) {
    // Generate a new set of particles
    for (var i = 0; i < particleAmount; i++) {
      // console.log('creating new particles')
      var posX, posY;
      do {
        // console.log('while inside creating particles for')
        posX = random(windowWidth);
        posY = random(windowHeight);
      } while (dist(posX, posY, windowWidth / 2, windowHeight / 2) <= 50);
      particles[particles.length] = new Particle(createVector(posX, posY));
    }
    lastParticleTime = currentTime; // Update the time of the last particle generation
  }

  var yoff = 0;
  for (var y = 0; y < rows; y++) {
    // console.log('calculating stuff depending on rows')
    var xoff = 0;
    for (var x = 0; x < cols; x++) {
      // console.log('calculating stuff depending on cols')
      var index = x + y * cols;
      var angle = noise(xoff, yoff, zoff) * TWO_PI * 4;
      var v = p5.Vector.fromAngle(angle); // create a vector using built in function
      v.setMag(1);
      flowfield[index] = v;
      xoff += inc;
    }

    yoff += inc;
    zoff += 0.001; // controls the speed of the vector movement
  }

  // for loop adding the particles in
  for (var i = 0; i < particles.length; i++) {
    // console.log('calculating particles stuff')
    particles[i].follow(flowfield);
    particles[i].update();
    particles[i].edges();
    particles[i].show();
  }
  pgIris.fill(backgroundColor); // Set the fill color to match the background
  pgIris.noStroke(); // Remove the stroke to make the circle hollow
  pgIris.circle(windowWidth / 2, windowHeight / 2, 100); // Draw the circle at the center with a diameter of  50 pixels
  image(pgIris, 0, 0);
}
