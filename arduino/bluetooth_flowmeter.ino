// Includes libraries needed
#include <Arduino.h>
#include "Adafruit_BLE.h"
#include "Adafruit_BluefruitLE_UART.h"
#include "BluefruitConfig.h"

#if SOFTWARE_SERIAL_AVAILABLE
  #include <SoftwareSerial.h>
#endif

    #define FACTORYRESET_ENABLE         1
    #define MINIMUM_FIRMWARE_VERSION    "0.6.6"
    #define MODE_LED_BEHAVIOUR          "MODE"


// Initialize the Software serial link to read data from the module
SoftwareSerial bluefruitSS = SoftwareSerial(BLUEFRUIT_SWUART_TXD_PIN, BLUEFRUIT_SWUART_RXD_PIN);

// Create bluetooth LE class to control our BLE module 
Adafruit_BluefruitLE_UART ble(bluefruitSS, BLUEFRUIT_UART_MODE_PIN,
                      BLUEFRUIT_UART_CTS_PIN, BLUEFRUIT_UART_RTS_PIN);

// create variables to check characteristics have been created successful
int totalFlowChannel;
int flowChannel;

// initialize the counter to 0
int counter = 0;

volatile int flow_frequency; // Measures flow sensor pulses
// Calculated litres/hour
 float vol = 0.0,l_minute;
 float samples = 1.0;
float cumulative_flow = 0.0;
float temp;
int sprayTime = 0;
unsigned char flowsensor = 2; // Sensor Input
unsigned long currentTime;
unsigned long cloopTime;
char stringBuffer[5];
char stringBufferFlow[4];


// A small helper
void error(const __FlashStringHelper*err) {
  Serial.println(err);
  while (1);
}

void flow () // Interrupt function
{
   flow_frequency++;
}

void setup(void)
{
  pinMode(13, OUTPUT);
  pinMode(12, OUTPUT);
  pinMode(flowsensor, INPUT);
  digitalWrite(flowsensor, HIGH); // Optional Internal Pull-Up

  attachInterrupt(digitalPinToInterrupt(flowsensor), flow, RISING); // Setup Interrupt
  cloopTime = currentTime;
  
  // verify if the serial port is available, and initialize it to display some informations
  while(!Serial) {
    delay(500);
  }

  Serial.begin(115200);

  /* Initialise the module */
  Serial.print(F("Initialising the Bluefruit LE module: "));

  if ( !ble.begin(VERBOSE_MODE) )
  {
    error(F("Couldn't find Bluefruit, make sure it's in CoMmanD mode & check wiring?"));
  }

  if ( FACTORYRESET_ENABLE )
  {
    /* Perform a factory reset to make sure everything is in a known state */
    Serial.println(F("Performing a factory reset: "));
    if ( !ble.factoryReset() ){
      Serial.println("Couldn't factory reset");
      while (true) {
        digitalWrite(13, HIGH);
        digitalWrite(12, HIGH);
        delay(1000); // Wait for 1000 millisecond(s)
        digitalWrite(13, LOW);
        digitalWrite(12, LOW);
        delay(1000); // Wait for 1000 millisecond(s)
      }
      error(F("Couldn't factory reset"));


    }
  }

  /* Disable command echo from Bluefruit */
  ble.echo(false);

  Serial.println("Requesting Bluefruit info:");
  /* Print Bluefruit information */
  ble.info();

  ble.reset();
 
   ble.println(F("AT+GATTADDSERVICE=UUID=0x180F"));
   if(!ble.waitForOK()){
    error(F("Error adding service"));
   } 
   
   totalFlowChannel = ble.println(F("AT+GATTADDCHAR=UUID=0x2A19,PROPERTIES=0x10,MIN_LEN=1,MAX_LEN=20,DESCRIPTION=Counter,VALUE=100"));
   delay(1000);
   if(totalFlowChannel == 0){
     error(F("Error adding characteristic"));
   }

   flowChannel = ble.println(F("AT+GATTADDCHAR=UUID=0x2A20,PROPERTIES=0x10,MIN_LEN=1,MAX_LEN=20,DESCRIPTION=Elevation,VALUE=100"));
   delay(1000);
   if(flowChannel == 0){
     error(F("Error adding characteristic"));
   }


  // reset the BLE module to take in count the previous modifications
  ble.reset();
  Serial.println();
  
  ble.verbose(false);  // debug info is a little annoying after this point!

  // set the callbacks to detect when a device has just been connected or disconnected to the BLE module
  ble.setConnectCallback(connected);
  ble.setDisconnectCallback(disconnected);

  
  /* Wait for connection */
  delay(1000);
 
}

void loop(void)
{
   ble.update(200);

   currentTime = millis();
   // Every second, calculate and print litres/hour
   if(currentTime >= (cloopTime + 1000 * samples))
   {
    cloopTime = currentTime; // Updates cloopTime
    if(flow_frequency != 0){
      // Pulse frequency (Hz) = 235
      // K factor = 1420 (pulses per L)
      temp = flow_frequency / 1420.0;
      l_minute = (temp * 60) / samples;
      cumulative_flow = cumulative_flow + temp;
      flow_frequency = 0;
      sprayTime += 1;
    }
    else {
      l_minute = 0;
    }
   }
   
   dtostrf(cumulative_flow * 100, 3, 0, stringBuffer);
   dtostrf(l_minute * 100, 3, 0, stringBufferFlow);
   Serial.println(stringBuffer);
   Serial.println(stringBufferFlow);

  // send the AT command to read the second characteristic we added
//  int elevation = ble.println(F("AT+GATTCHAR=2"));

  // if an error occured ("OK" is not received), then display an error message
//  if(!ble.waitForOK()) {
//    Serial.println(F("Error when reading elevation"));
//   }

  // print the elevation value in the serial monitor
//  Serial.print(F("[Elevation] ")); Serial.println(elevation);


  // increase the counter value of 1;
  counter++;

  // send the AT command to write the counter value in the first characteristic we added
//  ble.print(F("AT+GATTCHAR=1,"));
//  ble.println(counter*10);
//  strcpy(command, "AT+GATTCHAR=1,{total:");
//  strcpy(command, stringBuffer);
//  strcpy(command, "}");
//  command = "AT+GATTCHAR=1,{total:"+stringBuffer+"}"
  ble.print(F("AT+GATTCHAR=1,a"));
  ble.println(stringBuffer);
  ble.print("AT+GATTCHAR=2,a");
  ble.println(stringBufferFlow);
//  ble.println(F(command));
//  ble.print("AT+GATTCHAR=2,t");
//  ble.println(stringBuffer);
//  ble.println("}");
//  ble.println();

  // handle the error if "OK" is not received
  if(!ble.waitForOK()) {
//    Serial.println(F("Error when sending counter"));
    digitalWrite(13, HIGH);
    digitalWrite(12, HIGH);
    delay(2000); // Wait for 1000 millisecond(s)
    digitalWrite(13, LOW);
    digitalWrite(12, LOW);
    delay(1000); // Wait for 1000 millisecond(s)
   }

   delay(1000);
  
}
  
void connected(void)
{
  Serial.println( F("Connected") );

}

void disconnected(void)
{
  counter = 0;
  Serial.println( F("Disconnected") );
}
