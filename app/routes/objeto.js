module.exports = function(app){
	var api = app.api.objeto;

	app.get('/');
	
	app.post('/rfid/:tag', api.identifica);

};