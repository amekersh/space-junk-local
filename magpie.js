
class Magpie {
  static DOME_WIDTH = 20;
  static DOME_HEIGHT = 30;
  static PLATFORM_WIDTH = Magpie.DOME_WIDTH + 6;
  static PLATFORM_HEIGHT = 3;
  static BEAM_WIDTH = 50;
  static BEAM_HEIGHT = 60;
  static WINDOW_WIDTH = Magpie.DOME_WIDTH / 4;
  static WINDOW_HEIGHT = Magpie.DOME_HEIGHT / 4;

  // Where captured junk sits below the ship
  static CARGO_Y = 40;

  physics;
  beam;
  capturedJunk;

  constructor() {
    this.physics = new Physics();
    this.beam = false;
    this.capturedJunk = null;
  }

  draw() {
    push();

    drawEverywhere({
      offset: this.physics,
      drawFn: () => {

        // Draw captured junk underneath the ship
        if (this.capturedJunk !== null) {
          push();
          rotate(this.physics.rotation);
          translate(0, Magpie.CARGO_Y);
          Junk.drawJunk();
          pop();
        }

        Magpie.drawMagpie({
          rotation: this.physics.rotation,
          beam: this.beam
        });

        if (game.debug) {
          this.physics.draw();
        }
      },
    });

    pop();
  }

  // Captures junk and turns off the beam
  captureJunk(junk) {
    this.capturedJunk = junk;
    this.beam = false;
  }

  static drawMagpie({ rotation, beam }) {
    push();

    rotate(rotation);

    if (beam) {
      const halfWidth = Magpie.BEAM_WIDTH / 2;
      const heightVal = Magpie.BEAM_HEIGHT;
      const startY = Magpie.DOME_HEIGHT / 2;

      noStroke();
      fill(246, 212, 122, 80);

      triangle(
        10,
        startY,
        halfWidth + 7,
        startY + heightVal,
        -halfWidth + 7,
        startY + heightVal
      );
    }

    fill(251, 44, 68);
    rect(0, 0, Magpie.DOME_WIDTH, Magpie.DOME_HEIGHT, 5);

    fill(146, 170, 252);
    rect(-3, 30, Magpie.PLATFORM_WIDTH, Magpie.PLATFORM_HEIGHT, 5);

    fill(120, 184, 248);
    rect(
      0,
      Magpie.DOME_HEIGHT / 4,
      Magpie.WINDOW_WIDTH,
      Magpie.WINDOW_HEIGHT
    );

    pop();
  }

  move(delta) {
    this.physics.move(delta, { constrain: true });

    if (this.capturedJunk) {
     const rotation = this.physics.rotation
     this.capturedJunk.physics.x = this.physics.x - Math.sin(rotation) * Magpie.CARGO_Y
     this.capturedJunk.physics.y = this.physics.y + Math.cos(rotation) * Magpie.CARGO_Y
    }
  }

  beamContains({ x, y }) {
    if (!this.beam) {
      return false;
    }

    let dx = x - this.physics.x;
    let dy = y - this.physics.y;

    let localX =
      dx * Math.cos(this.physics.rotation) +
      dy * Math.sin(this.physics.rotation);

    let localY =
      -dx * Math.sin(this.physics.rotation) +
      dy * Math.cos(this.physics.rotation);

    const halfWidth = Magpie.BEAM_WIDTH / 2;
    const startY = Magpie.DOME_HEIGHT / 2;
    const endY = startY + Magpie.BEAM_HEIGHT;

    return (
      localY >= startY &&
      localY <= endY &&
      Math.abs(localX) <= halfWidth
    );
  }

  enableBeam(v) {
    if (!v) {
      this.beam = false;
    } else if (this.capturedJunk === null) {
      this.beam = true;
    }
  }
}
