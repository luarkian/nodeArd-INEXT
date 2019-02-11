var http = require('http');
const SerialPort = require('serialport')
const Readline = require('@serialport/parser-readline')
const port = new SerialPort('\\\\.\\COM5', { baudRate: 9600 })
var app = require('./config/express');
const parser = new Readline()
port.pipe(parser);
var objeto;

// Serial
parser.on('data', (recebido_arduino) => {
	var leitura = recebido_arduino.split(':');
	var tag = leitura[1].split('\r');
	 objeto= {'sala':leitura[0],
	 			'tag': tag[0]}; 			
	console.log(objeto);
	 		})
port.write('ROBOT POWER ON\n');

http.createServer(app).listen(3000,function(){
	console.log('Servidor Iniciado.');
});