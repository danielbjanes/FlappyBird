class Bird {
  constructor(brain) {
    this.score = 0;
    this.fitness = 0;
    this.livingScore = 0;

    this.y = height/2;
    this.x = 64;

    this.birdHieght = 24;
    this.birdWidth = 40;

    this.gravity = 1;
    this.jumpHeight = -15;
    this.velocity = 0;
    this.dead = false;

    if (brain instanceof NeuralNetwork) {
      this.brain = brain.copy();
    } else {
      this.brain = new NeuralNetwork(4, 4, 1);
    }

  }

  //draws the bird
  show() {
    noStroke();
    fill(0);
    ellipse(this.x, this.y, this.birdWidth, this.birdHieght);
  }

  //updates the birds position
  update(pipes) {
    this.livingScore++; // a point for each time it is alive to calculate fitness


    this.velocity += this.gravity;
    this.y += this.velocity;

    //checks if the bird hits the ground
    if( this.y >= height) {
      this.y = height;
      this.velocity = 0;
    }

    //checks if the bird goes out the top
    if(this.y < 100) {
      this.y = 100;
      this.velocity = 0;
    }

    this.hit(pipes);
    this.checkPoints(pipes);
    this.think(pipes);
}


  think(pipes) {
    //find closest pipe
    let closest = null;
    let closestDis = Infinity;
    for(let index = 0; index < pipes.length; index++) {
      let d =  (pipes[index].topX/2 + pipes[index].pipeWidth/2) - this.x;
      if(d < closestDis && d > 0) {
        closest = pipes[index];
        closestDis = d;
      }
    }

    let inputs = []
    inputs[0] = this.y / height;
    inputs[1] = closest.top_bottom / height;
    inputs[2] = closest.bottomY / height;
    inputs[3] = (closest.topX + closest.pipeWidth/2) / width;

    let output = this.brain.predict(inputs);

    if(output[0] < 0.5) {
      this.jump();
    }
  }

  mutate() {
    this.brain.mutate(0.1);
  }

  // checks to see if the bird has scored another point
  checkPoints(pipes) {
    for(let index = 0; index < pipes.length; index++) {
      if(dist(this.x, 0, pipes[index].topX, 0) <= 1) {
        this.score++;
      }
    }
  }

  // jumps bird
  jump() {
    this.velocity = this.jumpHeight
  }

  // hits a pipe
  hit(pipes) {
    for(let index = 0; index < pipes.length; index++) {
      if(this.x + this.birdWidth/2 >= pipes[index].topX && this.x - this.birdWidth/2 <= pipes[index].topX + pipes[index].pipeWidth
              && this.y - this.birdHieght/2 <= pipes[index].topY + pipes[index].top_bottom && this.y + this.birdHieght/2 >= 0
              || this.x + this.birdWidth/2 >= pipes[index].topX && this.x - this.birdWidth/2 <= pipes[index].topX + pipes[index].pipeWidth
              && this.y - this.birdHieght/2 <= height && this.y + this.birdHieght/2 >= pipes[index].bottomY) {
        this.dead = true;
      }
    }
  }
}
