const TOTAL = 500;
var counter;
var pipes = [];
var savedBirds = [];
var birds = [];
var slider;

function setup() {
	background(0, 157, 0);
	slider = createSlider(1, 100, 1);
	createCanvas(800, 800);

	for(var i = 0; i < TOTAL; i++) {
		birds[i] = new Bird();
	}

	counter = 0;
}

function draw() {

	for(let n = 0; n < slider.value(); n++) {
		//add new pipes to the game
		if(counter % 200 == 0) {
			pipes.push(new Pipe());
		}

		//pipe movement
		counter += 1;
		for(let index = 0; index < pipes.length; index++) {
			  pipes[index].update()
				if(index == 0) {
					//remove pipes off the screen
					if(pipes[index].topX <= -600) {
						pipes.shift();
					}
				}
		}


		for (let i = 0; i < birds.length; i++) {
			birds[i].update(pipes);

			if(birds[i].dead == true) {
				savedBirds.push(birds.splice(i, 1)[0]);
			}
		}

		//new generation
		if(birds.length == 0) {
			nextGeneration();
			pipes = [];
			counter = 0;
		}
	}

	//draws everything
	if(slider.value() < 90) {
		background(51, 255, 255);
		for(let bird of birds) {
			bird.show();
		}
		birds[0].show();

		for (let pipe of pipes) {
			pipe.show();
		}
	}

}
