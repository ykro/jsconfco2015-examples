#include "neopixel/neopixel.h"

#define PIXEL_PIN D2
#define PIXEL_TYPE WS2812B
#define LEDsW 3
#define LEDsH 3

int color;
Adafruit_NeoPixel strip = Adafruit_NeoPixel(LEDsW * LEDsH, PIXEL_PIN, PIXEL_TYPE);

void setup() {
  strip.begin();
  strip.setBrightness(50);
  Particle.function("lightLED", lightLED);
  Particle.function("setColor", setColor);
}

int setColor(String args) {
  int firstCommaPosition = args.indexOf(",");
  int lastCommaPosition = args.lastIndexOf(",");

  int r = atoi(args.substring(0,firstCommaPosition));
  int g = atoi(args.substring(
                      firstCommaPosition+1,lastCommaPosition));
  int b = atoi(args.substring(lastCommaPosition+1));
  color = strip.Color(r,g,b);
  return 1;
}

int lightLED(String args) {
  int commaPosition = args.indexOf(",");
  int x = args.substring(0,commaPosition).toInt();
  int y = args.substring(commaPosition+1).toInt();
  
  int ledAddr = x + (y * LEDsW);  
  strip.setPixelColor(ledAddr, color);
  strip.show();
  return 1;
}
