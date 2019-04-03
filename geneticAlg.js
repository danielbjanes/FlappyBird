function nextGeneration() {

  console.log("mutate")
  calculateFitness();

  for(let i = 0; i < TOTAL; i++) {
    birds[i] = selectParent();
  }
}

function calculateFitness() {
  let sum = 0;
  for(bird of savedBirds) {
    sum += bird.livingScore;
  }

  for(bird of savedBirds) {
      bird.fitness = (bird.livingScore / sum) * (1 + bird.score);
  }
}


function selectParent() {
  let index = 0;
  let r = random(1);

  while(r > 0) {
    r = r - savedBirds[index].fitness;
    index++;
  }
  index--;

  let bird = savedBirds[index];
  let child = new Bird(bird.brain);
  child.mutate();
  return child;

}
