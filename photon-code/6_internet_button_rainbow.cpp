#include "InternetButton/InternetButton.h"

InternetButton button = InternetButton();
bool rainbow = false;

void setup() {
  //agregar un 1 si es el SparkButton original
  button.begin(); 
}

void loop() {
  if(button.allButtonsOn()) {
    button.rainbow(5);
    rainbow = true;
    return;
  }
  
  if (rainbow == true) {
    button.allLedsOff();
    rainbow = false;
  }
}

