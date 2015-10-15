#include "InternetButton/InternetButton.h"

InternetButton button = InternetButton();
int r,g,b,level;

void setup() {
  //agregar un 1 si es el SparkButton original
  button.begin(); 
  Particle.function("allOn", allOn);
  Particle.function("allOff", allOff);
  Particle.function("setLevel", setLevel);
  Particle.function("setColor", setColor);
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

