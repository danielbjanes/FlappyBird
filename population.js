class Population {
  constructor() {
    this.birds = [];
    this.generation = 0;

    //initalized the birds
    for(let i = 0; i < TOTAL; i++) {
  		this.birds.push(new Bird());
  	}
  }
  // updates movement for all the birds
  update(pipes) {
    for(let bird of this.birds) {
      bird.update(pipes);
    }
  }

  //checks if all birds are deads
  allBirdsDead() {
    for(let bird of this.birds) {
      if(bird.dead == false) {
        return false;
      }
    }
    return true;
  }

  //increment generations
  nextGeration() {

    let birdP = random(this.birds);
    let child = new Bird(birdP.brain);
    child.mutate();

    for(let i = 0; i < TOTAL; i++) {
      this.birds[i] = child;
      this.generation++;
    }
  }

  calculateFitness() {
    let sum = 0;
    //calculates total sum of all birds
    for(let bird of bird) {
      sum += bird.livingScore;
    }

    //set individule fitness
    for(let bird of bird) {
      bird.fiteness = (bird.livingScore / sum) * (bird.livingScore / sum);
    }
  }

}
