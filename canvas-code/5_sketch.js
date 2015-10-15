var token = '<Particle token>';
var photonDevice;
var mic, oldLevelValue;
var r, g, b;

function setup() {
  createCanvas(520, 400);
  mic = new p5.AudioIn();
  mic.start();  

  r = Math.round(random(255));
  g = Math.round(random(255));
  b = Math.round(random(255));
  particleLogin(r,g,b);
}

function draw() {
  background(100);  
  var vol = mic.getLevel();
  var h = map(vol, 0, 1, height, 0);
  
  strokeWeight(2);
  stroke(r,g,b);
  fill(r,g,b,100);
  ellipse(width/2,h-30,50,50);

  var level = Math.round(map(vol, 0, 1, 1, 11));
  if (oldLevelValue != level) {
    oldLevelValue = level;
    setLevel(level);    
  }
}

function mousePressed() {
  r = Math.round(random(255));
  g = Math.round(random(255));
  b = Math.round(random(255));
  sendColorToPhoton(r,g,b);
}

function setLevel(level) {
  if (photonDevice != null) {
    photonDevice.callFunction('setLevel', level, 
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

function setColor(r,g,b) {
  if (photonDevice != null) {
    photonDevice.callFunction('setColor', r + ',' + g + ',' + b, 
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
            setColor(r,g,b);
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