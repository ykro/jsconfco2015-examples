var rows = 3;
var columns = 3;
var pixelSize = 50;
var photonDevice, color, width, height, squareSize;
var token = '<Particle token>';
var colors = ["#ffffff","#000000","#ff0000","#00ff00","#0000ff","#8888ff","#ff88dd","#ff8888","#ff0055","#ff8800","#00ff88","#ccff00","#0088ff","#440088","#ffff88","#88ffff"];

function setup() {
  particleLogin();
  color = colors[Math.round(Math.random()*colors.length)];  

  width = columns * pixelSize;
  height = rows * pixelSize;
  squareSize = width/colors.length;

  createCanvas(width+1, height+squareSize+1);  
  
  var x = 0;
  var y = height-squareSize-1;
  for (var i = 0; i < colors.length; i++) {
    fill(colors[i]);
    rect(x, y, squareSize, squareSize);	  	
    x += squareSize;
  }
}

function mouseClicked() {
  if (mouseY > (height-pixelSize-squareSize)) {
  	if (mouseY > (height - squareSize)){
	    color = colors[Math.ceil(mouseX/squareSize)-1];
  	}    
  } else {  	    
    myDraw(mouseX,mouseY);
  }
}

function mouseDragged() {  
  if (mouseY < (height-pixelSize-squareSize)) {
    myDraw(mouseX,mouseY);
  }
}

function myDraw(x,y){
  fill(color);
  stroke(color);
  rect(x, y, pixelSize, pixelSize);
  x = Math.round(map(x,0,width,0,columns))
  y = Math.round(map(y,0,height,0,rows))
  lightLED(x,y);
}

function lightLED(x, y) {
  if (photonDevice != null) {
    var decColor = parseInt(color.substring(1), 16);
    photonDevice.callFunction('lightLED', x + ',' + y + ',' + decColor, 
      function(err, data) {
        if (err) {
          console.log('An error occurred:', err);
        } else {
          console.log('Function called succesfully:', data);
        }
      }
    );           
  }
}

function particleLogin() {
  spark.login({accessToken: token}).then(
    spark.listDevices().then(
      function(devices){
        for (var i = 0; i < devices.length; i++) {
          var currentDevice = devices[i];
          if (currentDevice.connected) {
            photonDevice = currentDevice;
            break;
          }
        }
        if (photonDevice != undefined) {
          console.log('Device connected: ', photonDevice.name);
        } else {
          console.log('No connected devices');  
        }        
      },
      function(err) {
        console.log('List devices call failed: ', err);
      }
    )
  );   
}