int led = D7;

void setup() {
  pinMode(led, OUTPUT);
  Serial.begin(9600);
}

void loop() {
  Serial.println('encendido');
  digitalWrite(led, HIGH);
  delay(1000);

  Serial.println('apagado');
  digitalWrite(led, LOW);
  delay(1000);
}

