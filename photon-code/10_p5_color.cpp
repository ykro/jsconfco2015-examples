#include "InternetButton/InternetButton.h"

InternetButton button = InternetButton();
void setup() {
  //agregar un 1 si es el SparkButton original
  button.begin(); 
  Particle.function("allOn", allOn);
  Particle.function("allOff", allOff);
}

void loop() {
}

int allOn(String args) {
  int firstCommaPosition = args.indexOf(",");
  int lastCommaPosition = args.lastIndexOf(",");

  int r = atoi(args.substring(0,firstCommaPosition));
  int g = atoi(args.substring(
                      firstCommaPosition+1,lastCommaPosition));
  int b = atoi(args.substring(lastCommaPosition+1));
  
  button.allLedsOn(r,g,b);
  return 1;
}

int allOff(String args) {
  button.allLedsOff();
  return 1;
}

