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
  int i = rand() % 11;
	button.ledOn(i, r, g, b);
	delay(1000);

	button.ledOff(i);
	delay(1000);
}

