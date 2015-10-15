var r, g, b;

function setup() {
  createCanvas(520, 400);

  r = Math.round(random(255));
  g = Math.round(random(255));
  b = Math.round(random(255));
}

function draw() {
  background(100);  
  strokeWeight(2);
  stroke(r,g,b);
  fill(r,g,b,100);
  ellipse(250,200,200,200);
}

function mousePressed() {
  var d = dist(mouseX, mouseY, 250, 200);
  if (d < 100) {
    r = Math.round(random(255));
    g = Math.round(random(255));
    b = Math.round(random(255));
  } 
}