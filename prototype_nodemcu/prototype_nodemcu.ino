#include "ESP8266WiFi.h"
#include <ESP8266HTTPClient.h>
#include <ArduinoJson.h>
//RFID
#include <MFRC522.h>
#include <SPI.h>

 // Wifi Parametros
const char* ssid = "Rede";
const char* password = "semsenha";
// Server
//const char* host = "IP SERVER";
const char* url = "http://192.168.0.105:3000/verificacao";
const int port = 3000;

const char* sala = "101";

const int capacity = JSON_OBJECT_SIZE(1) + JSON_OBJECT_SIZE(1);
// NODEMCU
 #define SS_PIN D4
 #define RST_PIN D2
MFRC522 rfid(SS_PIN, RST_PIN);
MFRC522::MIFARE_Key key;
 
void setup()
{
  Serial.begin(115200);   // configura monitor serial 115200 Bps
  Serial.println();   // imprime uma linha
  

  WiFi.begin(ssid,password); 
  while(WiFi.status() != WL_CONNECTED){
    delay(500);
    Serial.print(".");
    }
  Serial.println("");
  Serial.println("WiFi connected ");
  Serial.println(WiFi.localIP());

  SPI.begin(); 
    // init rfid
  rfid.PCD_Init();
 //WiFi.mode(WIFI_STA);   // configura rede no modo estacao
 // WiFi.disconnect();   // desconecta rede WIFI
 // delay(100);   // atraso de 100 milisegundos
}
 
void prinScanResult(int networksFound)
{
  Serial.printf("\n");   // imprime uma linha
  Serial.printf("%d redes encontradas\n", networksFound);   // imprime numero de redes encontradas
  for (int i = 0; i < networksFound; i++)   // contagem das redes encontradas
  {
   Serial.printf("%d: %s, Ch:%d (%ddBm) %s\n", i + 1, WiFi.SSID(i).c_str(), WiFi.channel(i), WiFi.RSSI(i), WiFi.encryptionType(i) == ENC_TYPE_NONE ? "aberta" : "");
  }
}
 
void loop()
{
  DynamicJsonDocument jsonBuffer ( 1024 );  
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
    cont.toUpperCase();
   JsonObject obj = jsonBuffer.to<JsonObject>();
    obj["sala"]= sala;
    obj["tagRFID"]= cont;
    
 if(WiFi.status()== WL_CONNECTED){
      HTTPClient http;
      http.begin(url);
      http.addHeader("Content-Type",  "application/json");
      String postData = "";
   
      serializeJsonPretty( obj, postData);
      
      Serial.println(postData);
      int httpCode = http.POST(postData);
      //int httpCode = http.POST("\r\n\r\n{\r\n\t\"sala\": \"teste\",\r\n\t\"tagRFID\":\"01\"\r\n}");
      http.writeToStream(&Serial);
      String payload = http.getString();
      Serial.println(httpCode);   //Print HTTP return code
      Serial.println(payload);
      http.end();
     
  }
  else{
 
    Serial.println("Error in WiFi connection");   
 
    }

  delay(5000);   // atraso de 0,5 segundos
}
