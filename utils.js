
function drawEverywhere({ offset, drawFn }) {
  push();
  translate(offset.x, offset.y);
  drawFn();
  pop();
}

function drawPlaceholder({ rotation, w, h }) {
  push();
  rotate(rotation);
  noFill();
  stroke(255);
  rectMode(CENTER);
  rect(0, 0, w, h);
  line(0, 0, 0, -h);
  pop();
}

function timeToStringParts(timeMs) {
  const totalSeconds = Math.ceil(timeMs / 1000);
  const minutes = String(Math.trunc(totalSeconds/60));
  const seconds = String(totalSeconds % 60).padStart(2,"0");
  
  return {minutes,seconds};
}