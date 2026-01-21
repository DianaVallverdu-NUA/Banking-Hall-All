// draw a frame around sketch
function drawFrame(w) {
  translate(width / 2, height / 2);
  noStroke();
  fill(0, 0, 0);
  rect(-width / 2, -height / 2, w, height);
  rect(width / 2 - w, -height / 2, w, height);
}

function draw() {
  push();
  customDraw();
  pop();

  drawFrame(230);
}
