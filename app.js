// Example from https://github.com/jaredhanson/passport-local/tree/master/examples/express3-mongoose

/*
 * Pour ajouter des changements : git add .
 * Pour commiter les changements : git commit -m "message"
 * Pour pousser les commit :
 *         git push [remote name] local_branch:remote_branch
 * Pour pousser sur github (de dev à dev) : git push GitHub dev:dev
 * Pour pousser sur heroku (de dev à master) : git push dev-heroku dev:master
 */

var express = require('express')
  , app = express()
  , mongoose = require('mongoose')
  , pass = require('./config/pass')
  , passport = require('passport')
  , node_routes = require('./routes/routes')
  , port = process.env.PORT || 8080;

//Database connect
var usernameHQ = process.env.UserNameMongoHQ;
var pwd = process.env.PassWordMongoHQ;
var uristring = 'mongodb://' + usernameHQ + ':' + pwd + '@emma.mongohq.com:10090/AppJobDB';

var mongoOptions = { db: { safe: true }};

mongoose.connect(uristring, mongoOptions, function (err, res) {
  if (err) { 
    console.log ('ERROR connecting to: ' + uristring + '. ' + err);
  } else {
    console.log ('Successfully connected to MongoHQ');
  }
});

//Mongoose models
var user_routes = require('./routes/user')
  , profile_routes = require('./routes/profile')
  , jobOffers_routes = require('./routes/jobOffers')
  , backlog_routes = require('./routes/backlog.js');

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
	this.use(function(req,res){
	    res.status(404).send('This requested page does not exist... yet');
	});
});


// Basic pages
app.get('/', node_routes.welcome);
app.get('/index', pass.ensureAuthenticated, node_routes.index);
app.get('/home', pass.ensureAuthenticated, node_routes.home);

/*
 * Login/out pages
 */
app.get('/login', node_routes.login);
app.post('/login', user_routes.login);
app.get('/logout', user_routes.logout);
app.get('/register', node_routes.register);
app.post('/register', user_routes.register);

/*
 * Profile pages
 */
app.get('/profile', pass.ensureAuthenticated, profile_routes.profile);
app.get('/dashboard', pass.ensureAuthenticated, profile_routes.dashboard);
app.get('/profUpdate', pass.ensureAuthenticated, profile_routes.profileUpdate);
app.post('/profUpdate', pass.ensureAuthenticated, profile_routes.update);
app.get('/offers', pass.ensureAuthenticated, profile_routes.offers);
app.get('/jobs', pass.ensureAuthenticated, profile_routes.jobs);
app.get('/submissions', pass.ensureAuthenticated, profile_routes.submissions);
app.get('/api/profile', pass.ensureAuthenticated, profile_routes.profileAPI);
app.post('/api/profile', pass.ensureAuthenticated, profile_routes.updateAPI);

/*
 * API REST
 */
app.get('/api/myJobs', pass.ensureAuthenticated, jobOffers_routes.allMyJobs);
app.get('/api/myJobs/:jobId', pass.ensureAuthenticated, jobOffers_routes.jobById);
app.post('/api/myJobs', pass.ensureAuthenticated, jobOffers_routes.create);
app.del('/api/myJobs/:jobId', pass.ensureAuthenticated, jobOffers_routes.remove);
app.get('/api/lastSevenJobs', jobOffers_routes.sevenLastJobs);
app.get('/api/jobs', pass.ensureAuthenticated, jobOffers_routes.all);
app.get('/api/count', pass.ensureAuthenticated, jobOffers_routes.countAll);

app.get('/api/backlog', pass.ensureAuthenticated, backlog_routes.all);
app.post('/api/backlog', pass.ensureAuthenticated, backlog_routes.create);
app.del('/api/backlog/:Id', pass.ensureAuthenticated, backlog_routes.remove);

app.listen(port, function() {
  console.log('Express server listening on port: ' + port);
});
