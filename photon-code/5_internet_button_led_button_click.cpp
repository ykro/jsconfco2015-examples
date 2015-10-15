#include "InternetButton/InternetButton.h"

InternetButton button = InternetButton();
void setup() {
  //agregar un 1 si es el SparkButton original
  button.begin(); 
}

void loop() {
  int r = rand() % 255;
  int g = rand() % 255;
  int b = rand() % 255;
  
  if (button.buttonOn(2)) {
    button.ledOn(3, r, g, b);  
  } else {
    button.ledOff(3);  
  }	
}

