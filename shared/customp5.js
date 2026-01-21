// draw a frame around sketch
function drawFrame(w) {
  noStroke();
  fill(0, 0, 0);
  rect(0, 0, w, height);
  rect(width - w, 0, w, height);
}

function draw() {
  push();
  customDraw();
  pop();

  drawFrame(230);
}
