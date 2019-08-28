class Cloud {
  constructor() {
    this.x = 850;
    this.y = random(0, height/3);

    this.speed = random (1, 4);
  }

  show() {
    stroke(255);
    strokeWeight(1);
    fill(255);
    ellipse(this.x, this.y, 24, 24);
    ellipse(this.x+10,this.y+10,24,24);
    ellipse(this.x+30,this.y+10,24,24);
    ellipse(this.x+30,this.y-10,24,24);
    ellipse(this.x+20,this.y-10,24,24);
    ellipse(this.x+40,this.y,24,24);
  }

  update() {
    this.x -= this.speed;
  }



}
