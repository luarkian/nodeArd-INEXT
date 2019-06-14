
//RFID
#include <MFRC522.h>
#include <SPI.h>

// Definicoes pino modulo RC522
#define SS_PIN 10
#define RST_PIN 9

MFRC522 rfid(SS_PIN, RST_PIN);
MFRC522::MIFARE_Key key;
//int tag1[5] = {0x56, 0x6C, 0x96, 0xA5};
//int tag2[5] = {0x15, 0x5B, 0x0E, 0x88};
bool t1 = 0;
bool t2 = 0;
void setup() {
  // put your setup code here, to run once:
  
  //init serial monitor
    Serial.begin(9600);
    
    SPI.begin();
  // init rfid
    rfid.PCD_Init();
  
  //msg
  //Serial.println("...SALA 1");
}

void loop() {
  if(!rfid.PICC_IsNewCardPresent()){
      return;
    }
  if( !rfid.PICC_ReadCardSerial()){
      return;
    }
  // UID na serial
  //Serial.print("UID da tag: ");
  String cont = "";
  byte letra;

  for (byte i =0; i < rfid.uid.size; i++){
    //Serial.print(rfid.uid.uidByte[i]< 0x10 ? " 0": " ");
    //Serial.print(rfid.uid.uidByte[i], HEX);
    cont.concat(String(rfid.uid.uidByte[i] < 0x10 ? " 0": " "));
    cont.concat(String(rfid.uid.uidByte[i], HEX)); 
  }
  //Serial.println();
  Serial.print("202:");
  cont.toUpperCase();
  Serial.print(cont);
  Serial.println(" ");
  delay(1000);
  
 
  }
