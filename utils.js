
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
  const minutes = String(Math.trunc(secondsLeft/60));
  const seconds = String(secondsLeft % 60).padStart(2,"0");
  
  return {minutes,seconds};
}

  timeLeft(){
    const remainingTime = this.time.initial - this.time.elapsed
    return Math.max(0,remainingTime)
  }
  draw(score, lives){
    push()
    
  for (let i=0; i<lives - 1; i++){
    translate(
      level.LIVES_PAD_LEFT + i * Level.LIVES_GAP,
      height - Level.LIVES_PAD_BOTTOM
    )
    scale(Level.LIVES_SCALE)
    Magpie.drawMagpie({rotation: .2, beam:false})
  }
}