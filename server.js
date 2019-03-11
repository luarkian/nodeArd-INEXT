const express = require('express');
const app = express();
const http = require('http').Server(app);
const SerialPort = require('serialport')
const Readline = require('@serialport/parser-readline')
const port = new SerialPort('\\\\.\\COM4', { baudRate: 9600 })
const mongoose = require("mongoose");
const bodyParser = require('body-parser');
const admin = require('./app/routes/objeto');


const path =require("path");
app.use(express.static(path.join(__dirname,"public")));

//Routes
app.use('/admin',admin);
//bory paser
app.use(bodyParser.urlencoded({extended:true}));
app.use(bodyParser.json());

// configuração mongoose
mongoose.Promise = global.Promise;
mongoose.connect("mongodb://localhost/nodeArd").then(() =>{
	console.log("mongodb conectado");
});
mongoose.connection.on('connected',function(){
console.log('Conectado ao banco de dados.');
});

mongoose.connection.on('error', function(error){
console.log('Erro na conexão'+error);
});

mongoose.connection.on('disconnected', function(){
console.log('Desconectado do banco de dados');
});

process.on('SIGINT',function(){
mongoose.connection.close(function(){
  console.log('Aplicação terminada, conexão fechada');
  process.exit(0);
});
});


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
	########################################*/
	
	/*/ Serial/*/
parser.on('data', (recebido_arduino) => {
	var leitura = recebido_arduino.split(':');
	var tag = leitura[1].split('\r');
	 objeto= {'sala':leitura[0],
	 			'tag': tag[0]}; 			
	console.log(objeto);
	io.emit('dados arduino' ,objeto);
	objeto = {'sala':'','tag':''};
	});
	
});


http.listen(3000,function(){
	console.log('Servidor Iniciado.');
});