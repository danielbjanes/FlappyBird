function Pipe() {

  //Location attributes
  this.topX = width;
  this.topY = 0;
  this.top_bottom = Math.floor(Math.random() * (550 - 350)) + 200;
  this.pipeWidth = 120;
  this.gap = 350;

  this.speed = 2;

  this.bottomX = width;
  this.bottomY = this.top_bottom + this.gap;

  //Move pipes
  this.update = function() {
    this.topX -= this.speed;
    this.bottomX -= this.speed;
  }

  //Draw Pipe
  this.show = function() {
    stroke(1);
    fill(0, 255, 0);
    rect(this.topX, this.topY, this.pipeWidth, this.top_bottom); //top pipe

    rect(this.topX - 8, this.top_bottom - 20, this.pipeWidth + 16, 20);

    rect(this.bottomX, this.bottomY, this.pipeWidth, 800 - this.bottomY); // bottom pipe
    rect(this.bottomX - 8, this.bottomY, this.pipeWidth + 16, 20);

  }

}
