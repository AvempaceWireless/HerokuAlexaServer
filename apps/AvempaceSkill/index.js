module.change_code = 1;
'use strict';

var alexa = require('alexa-app');
var app = new alexa.app('avempace');
var mongoose = require('mongoose');
mongoose.connect('mongodb://abkerkeni:kerkeni83@ds113906.mlab.com:13906/avempace_db', { useMongoClient: true });
mongoose.Promise = global.Promise;

var Cat = mongoose.model('Cat', { name: String });

var kitty = new Cat({ name: 'Zildjian' });
var query = Cat.find(null);
query.where('name', 'Zildjian');
query.limit(1);
// peut s'écrire aussi query.where('pseudo', 'Atinux').limit(3);
query.exec(function (err, comms) {
  if (err) { throw err; }
  // On va parcourir le résultat et les afficher joliment
  var comm;
  var catfound = false;
  for (var i = 0, l = comms.length; i < l; i++) {
    comm = comms[i];
    console.log('------------------------------');
    console.log('Pseudo : ' + comm.name);
    console.log('------------------------------');
	catfound = true;
  }
  
  if(!catfound)
  {
		kitty.save(function (err) {
				  if (err) {
					console.log(err);
				  } else {
					console.log('meow');
				  }
		});  
  }
});


app.launch( function( request, response ) {
	response.say( 'Welcome to Avempace skill' ).reprompt( 'Way to go. You got it to run.' ).shouldEndSession( false );
} );


app.error = function( exception, request, response ) {
	console.log(exception)
	console.log(request);
	console.log(response);	
	response.say( 'Sorry an error occured ' + error.message);
};

app.intent('sayNumber',
  {
    "slots":{"number":"NUMBER"}
	,"utterances":[ 
		"say the number {1-100|number}",
		"give me the number {1-100|number}",
		"tell me the number {1-100|number}",
		"I want to hear you say the number {1-100|number}"]
  },
  function(request,response) {
    var number = request.slot('number');
    response.say("You asked for the number "+number);
  }
);

module.exports = app;