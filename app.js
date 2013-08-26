// Example from https://github.com/jaredhanson/passport-local/tree/master/examples/express3-mongoose
var express = require('express')
  , app = express()
  , db = require('./config/dbschema')
  , pass = require('./config/pass')
  , passport = require('passport')
  , node_routes = require('./routes/routes')
  , port = process.env.PORT || 8080;
  
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
app.get('/profile', pass.ensureAuthenticated, node_routes.getprofile);
app.post('/profile', node_routes.postprofile);
app.get('/login', node_routes.getlogin);
app.post('/login', node_routes.postlogin);
app.get('/logout', node_routes.logout);
app.get('/about', node_routes.about);
app.get('/contact', node_routes.contact);
app.get('/register', node_routes.getregister);
app.post('/register', node_routes.postregister);

app.listen(port, function() {
  console.log('Express server listening on port: ' + port);
});