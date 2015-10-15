var token = '<Particle token>';
var photonDevice;
var r, g, b;

function setup() {
  createCanvas(520, 400);

  r = Math.round(random(255));
  g = Math.round(random(255));
  b = Math.round(random(255));
  particleLogin(r,g,b);  
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
    sendColorToPhoton(r,g,b);
  } 
}

function sendColorToPhoton(r,g,b){
  if (photonDevice != null) {
    photonDevice.callFunction('allOn', r + ',' + g + ',' + b, 
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

function particleLogin(r,g,b) {
  spark.login({accessToken: token}).then(
    spark.listDevices().then(
      function(devices){
        for (var i = 0; i < devices.length; i++) {
          var currentDevice = devices[i];
          if (currentDevice.connected) {
            photonDevice = currentDevice;
            sendColorToPhoton(r,g,b);
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