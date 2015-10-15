var token = '<Particle token>';
var slider, oldSliderValue;
var photonDevice;
var r, g, b;

function setup() {
  createCanvas(520, 400);
  slider = createSlider(0, 11, 6);
  slider.position(10,450);
  
  r = Math.round(random(255));
  g = Math.round(random(255));
  b = Math.round(random(255));
  particleLogin(r,g,b,slider.value());
}

function draw() {
  background(100);  
  strokeWeight(2);
  stroke(r,g,b);
  fill(r,g,b,100);
  ellipse(250,200,200,200);
  if (oldSliderValue != slider.value()) {
    oldSliderValue = slider.value();
    setLevel(slider.value());
  }
}

function mousePressed() {
  var d = dist(mouseX, mouseY, 250, 200);
  if (d < 100) {
    r = Math.round(random(255));
    g = Math.round(random(255));
    b = Math.round(random(255));
    setColor(r,g,b);
  } 
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

function particleLogin(r,g,b,limit) {
  spark.login({accessToken: token}).then(
    spark.listDevices().then(
      function(devices){
        for (var i = 0; i < devices.length; i++) {
          var currentDevice = devices[i];
          if (currentDevice.connected) {
            photonDevice = currentDevice;
            setColor(r,g,b);
            setLevel(slider.value());
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