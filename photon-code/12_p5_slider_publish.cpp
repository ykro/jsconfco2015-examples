#include "InternetButton/InternetButton.h"

InternetButton button = InternetButton();

int r,g,b,level;
int prevX = 0, prevY = 0, prevZ = 0;
const int threshold = 50; 

void setup() {
  //agregar un 1 si es el SparkButton original
  button.begin(1); 
  Particle.function("allOn", allOn);
  Particle.function("allOff", allOff);
  Particle.function("setLevel", setLevel);
  Particle.function("setColor", setColor);
}

void loop() {
  int xVal = button.readX();
  int yVal = button.readY();
  int zVal = button.readZ();

  if ((abs (prevX - xVal) > threshold) || 
      (abs (prevY - yVal) > threshold) || 
      (abs (prevZ - zVal) > threshold)) {
        r = abs(xVal) % 255;
        g = abs(yVal) % 255;
        b = abs(zVal) % 255;
        lightLEDs();
    
        char color[12];
        sprintf(color,"%d,%d,%d",r,g,b);
        Particle.publish("motion", color, 60, PRIVATE);
        Serial.println(color);
        delay(1500);
  }

  prevX = xVal;
  prevY = yVal;
  prevZ = zVal;
  
  if (button.buttonOn(1)) {
    level = 11;
    lightLEDs();
    Particle.publish("level","11", 60, PRIVATE);
    delay (1000);
  }

  if (button.buttonOn(2)) {
    level = 3;
    lightLEDs();
    Particle.publish("level","3", 60, PRIVATE);
    delay (1000);
  }
  
  if (button.buttonOn(3)) {
    level = 6;
    lightLEDs();
    Particle.publish("level","6", 60, PRIVATE);
    delay (1000);
  }

  if (button.buttonOn(4)) {
    level = 9;
    lightLEDs();
    Particle.publish("level","9", 60, PRIVATE);
    delay (1000);
  }  
}

int allOn(String args) {
  button.allLedsOn(r,g,b);
  return 1;
}

int allOff(String args) {
  button.allLedsOff();
  return 1;
}

int setColor(String args) {
  int firstCommaPosition = args.indexOf(",");
  int lastCommaPosition = args.lastIndexOf(",");

  r = atoi(args.substring(0,firstCommaPosition));
  g = atoi(args.substring(
                      firstCommaPosition+1,lastCommaPosition));
  b = atoi(args.substring(lastCommaPosition+1));
  lightLEDs();
  return 1;
}

int setLevel(String args) {
  level = atoi(args);
  lightLEDs();
  return 1;
}

void lightLEDs() {
  if (level == 11) {
    button.allLedsOn(r,g,b);    
  } else {
    for (int i = 1; i <= 11; i++) {
        if (i <= level) {
            button.ledOn(i, r, g, b);
        } else {
            button.ledOff(i);
        }
    }
  }    
}

