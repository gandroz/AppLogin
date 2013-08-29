// Example from https://github.com/jaredhanson/passport-local/tree/master/examples/express3-mongoose
var express = require('express')
  , app = express()
  , mongoose = require('mongoose')
  , pass = require('./config/pass')
  , passport = require('passport')
  , node_routes = require('./routes/routes')
  , port = process.env.PORT || 8080;

//Database connect
var uristring = 
  process.env.MONGOLAB_URI || 
  process.env.MONGOHQ_URL || 
  'mongodb://localhost/AppLoginDB';

var mongoOptions = { db: { safe: true }};

mongoose.connect(uristring, mongoOptions, function (err, res) {
  if (err) { 
    console.log ('ERROR connecting to: ' + uristring + '. ' + err);
  } else {
    console.log ('Successfully connected to: ' + uristring);
  }
});

//Mongoose models
var user_routes = require('./routes/user')
  , profile_routes = require('./routes/profile')
  , jobOffers_routes = require('./routes/jobOffers');

// configure Express
app.configure(function() {
	this.set('views', __dirname + '/views');
	this.set('view engine', 'jade');	
	this.use(express.logger('dev'));
	this.use(express.cookieParser());
	this.use(express.bodyParser());
	this.use(express.methodOverride());
	this.use(express.session({ secret: 'pas touche minouche' }));
  // Initialize Passport!  Also use passport.session() middleware, to support
  // persistent login sessions (recommended).
	this.use(passport.initialize());
	this.use(passport.session());
	this.use(this.router);
	this.use(express.static(__dirname + '/public'));
});


// Basic pages
app.get('/', node_routes.index);
app.get('/home', node_routes.home);

// User pages
app.get('/profile', pass.ensureAuthenticated, profile_routes.load);
app.post('/profile', profile_routes.update);
app.get('/login', node_routes.login);
app.post('/login', user_routes.login);
app.get('/logout', user_routes.logout);
app.get('/about', node_routes.about);
app.get('/contact', node_routes.contact);
app.get('/register', node_routes.register);
app.post('/register', user_routes.register);
app.get('/jobs', node_routes.jobs);
app.post('/jobs', jobOffers_routes.create);


app.listen(port, function() {
  console.log('Express server listening on port: ' + port);
});