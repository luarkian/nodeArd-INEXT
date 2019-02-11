module.exports = function(app){
	var api = app.api.objeto;

	app.post('/rfid/:tag', api.identifica);

};