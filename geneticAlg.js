function nextGeneration() {

  console.log("mutate")
  calculateFitness();
  selectBest();


  for(let i = 1; i < TOTAL; i++) {
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

//sets best bird form pervious generation
function selectBest() {
  let index = 0;
  let r = random(1);

  while(r > 0) {
    r = r - savedBirds[index].fitness;
    index++;
  }
  index--;

  birds[0] = new Bird(savedBirds[index].brain);
  birds[0].isBest = true;
}

//finds a parent
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
