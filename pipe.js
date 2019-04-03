function Pipe() {
  this.topX = width;
  this.topY = 0;

  this.top_bottom = Math.floor(Math.random() * (550 - 150)) + 150;
  this.pipeWidth = 120;
  this.speed = 2;
  this.gap = 350;

  this.bottomX = width;
  this.bottomY = this.top_bottom + this.gap;

  this.update = function() {
    this.topX -= this.speed;
    this.bottomX -= this.speed;

  }

  this.show = function() {
    fill(255);
    rect(this.topX, this.topY, this.pipeWidth, this.top_bottom); //top pipe
    rect(this.bottomX, this.bottomY, this.pipeWidth, 800 - this.bottomY); // bottom pipe
  }

}
