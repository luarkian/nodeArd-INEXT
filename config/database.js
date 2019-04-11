module.exports = function(uri){
  var mongoose = require('mongoose');

  mongoose.connect('mongodb://localhost/nodeard', { useNewUrlParser: true});

  mongoose.connection.on('connected',function(){
    console.log('Conectado ao banco de dados.');
  });

  mongoose.connection.on('error', function(error){
    console.log('Erro na conexão '+error);
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
};

/*
// configuração mongoose
mongoose.Promise = global.Promise;
mongoose.connect('mongodb://localhost/nodeard');

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
*/
