const express = require('express');
const app = express();
const http = require('http').Server(app);
//const SerialPort = require('serialport')
//const Readline = require('@serialport/parser-readline')
//const port = new SerialPort('\\\\.\\COM4', { baudRate: 9600 })
const mongoose = require("mongoose");
const bodyParser = require('body-parser');
var ejs = require('ejs');
const io = require('socket.io')(http);

require('./app/models/objeto');
require('./app/models/admin');
require('./app/models/sala');
const modelObj = mongoose.model('objetosSchema');
const modelAdm = mongoose.model('adminSchema');
const modelSala = mongoose.model('salaSchema');
//bory paser
app.use(bodyParser.urlencoded({extended:true}));
app.use(bodyParser.json());

app.set('view engine', 'ejs')

const router = require('./app/routes/objeto');
const router2 = require('./app/routes/admin');
const router3 = require('./app/routes/sala');
//##
const adminSchema = require('./app/models/admin')
const objetoSchema = require('./app/models/objeto')
const salaSchema = require('./app/models/sala')

//##
require('./config/database')('localhost/nodeard');

const path =require("path");
//app.use(express.static(path.join(__dirname,"public")));

//Routes
app.use(router);
app.use(router2);
app.use(router3);

/*io.on('connection', (socket)=>{
		console.log('new connection', socket.id);
});*/
/*
const io = require('socket.io')(http);
const parser = new Readline()
port.pipe(parser);
var objeto = {'sala':'','tag':''};

port.write('ROBOT POWER ON\n'); 

io.on('connection', (socket)=>{
	console.log('new connection', socket.id);

	/*	############## SOCKET DO CHAT ############
	socket.on('message', (msg)=>{
		console.log(msg)
		io.emit('message',msg);
	});
	########################################/
	
	// Serial//
parser.on('data', (recebido_arduino) => {
	var leitura = recebido_arduino.split(':');
	var tag = leitura[1].split('\r');
	 objeto= {'sala':leitura[0],
	 			'tag': tag[0]}; 			
	console.log(objeto);
	io.emit('dados arduino' ,objeto);
	objeto = {'sala':'','tag':''};
	});
	//teste(objeto);
	
}); */
app.use(express.static(__dirname + '/public'));
	http.listen(3000,function(){
	console.log('Servidor Iniciado.');
});