#include "InternetButton/InternetButton.h"

InternetButton button = InternetButton();

int prevX = 0, prevY = 0, prevZ = 0;
const int threshold = 50; 

void setup() {
  //agregar un 1 si es el SparkButton original
  button.begin(); 
}

void loop() {
  int xVal = button.readX();
  int yVal = button.readY();
  int zVal = button.readZ();

  if ((abs (prevX - xVal) > threshold) || 
      (abs (prevY - yVal) > threshold) || 
      (abs (prevZ - zVal) > threshold)) {

        int r = xVal % 255;
        int g = yVal % 255;
        int b = zVal % 255;
        button.allLedsOn(r,g,b);

        char coords[20];
        sprintf(coords,"%d,%d,%d",xVal,yVal,zVal);
        Particle.publish("motion", coords, 60, PRIVATE);        
  }

  prevX = xVal;
  prevY = yVal;
  prevZ = zVal;  
}

