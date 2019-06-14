import serial
import json
import requests
#####
url = 'http://172.22.13.51:3000/verificacao'
####
ser = serial.Serial('\\\\.\\COM6',9600)
i = 1
while i < 6:
    print("Aguardando leitura da TAG RFID")
    a = str(ser.readline())
    b = a[2:20]
    a = b.split(":")
    obj = {
        "sala":a[0],
        "tagRFID":a[1]
    }
    r = requests.post(url, obj)
    print ("JSON SEND: "+ r.text)