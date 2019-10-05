const TOTAL = 300;
var counter;
var pipes = [];
var savedBirds = [];
var birds = [];
var clouds = [];

var counter;
var scoreC = 0;
var highScore = 0;
var generation = 0;

var can;
var slider;
var scoreC = 0;
var highScore = 0;
var generation = 0;

//Init canvas
function setup() {
	can = createCanvas(800, 800);
	slider = createSlider(1, 100, 1);
	slider.position(50, 42);
	centerCanvas();
	background(0, 157, 0);

	for(var i = 0; i < TOTAL; i++) {
		birds[i] = new Bird();
	}

	counter = 0;
}

function centerCanvas() {
  let x = (windowWidth - width) / 2;
  let y = (windowHeight - height) / 2;
  can.position(x, y);
}

function windowResized() {
  centerCanvas();
}

//Draw tick update for the screen
function draw() {

	for(let n = 0; n < slider.value(); n++) {
		//add new pipes to the game
		if(counter % 200 == 0) {
			pipes.push(new Pipe());
		}

		//add pretty clouds!! :)
		if(counter % random(80, 100).toFixed(0) == 0) {
			clouds.push(new Cloud());
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

		//cloud movement :)
		for(let index = 0; index < clouds.length; index++) {
				clouds[index].update();
				if(index == 0) {
					//remove pipes off the screen
					if(clouds[index].x <= -200) {
						clouds.shift();
					}
				}
		}


		for (let i = 0; i < birds.length; i++) {
			birds[i].update(pipes);

			if(birds[i].dead == true) {
				savedBirds.push(birds.splice(i, 1)[0]);
			}
		}

		//adds score
		if(counter > 400-64) {
			if(counter % 200 == 0){
				scoreC++;
				if(highScore <= scoreC) highScore = scoreC;
			}
		}

		//new generation
		if(birds.length == 0) {
			nextGeneration();
			pipes = [];
			counter = 0;
			scoreC = 0;
			generation++;
		}
	}

	//draws everything

	background(51, 255, 255);

	//draws pipes
	for (let pipe of pipes) {
		pipe.show();
	}

	for(let cloud of clouds) {
		cloud.show();
	}

	//draws birds
	for(let i = 0; i < birds.length; i++) {
		birds[i].show();
	}

	//draws score and generation

	//rectangle
	noStroke();
	fill(128,128,128, 200);
	rect(0, 0, width, 100 - 12);

	//speed slider
	/*fill(128, 128, 128)
	rect()
	fill(255, 255, 255, 255);

	text("Speed", 86, 34);*/

	//text info
	fill(255, 255, 255, 255);
	textSize(20);
	text("Generation: " + generation, 85, 48);
	text("Score: " + scoreC, 360, 48);
	text("High Score: " + highScore, 570, 48);
	fill(0);
	textSize(12);
	text("github.com/danielbjanes", 660,80);

}
