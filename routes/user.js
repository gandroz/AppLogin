/**
 * User controller
 */
var mongoose = require('mongoose')
  , passport = require('passport')
  , dbUser = require('../config/models/user')
  , User = dbUser.userModel
  , dbProfile = require('../config/models/profile')
  , Profile = dbProfile.profileModel;//mongoose.model('User');

//POST /login
//Use passport.authenticate() as route middleware to authenticate the
//request.  If authentication fails, the user will be redirected back to the
//login page.  Otherwise, the primary route function function will be called,
//which, in this example, will redirect the user to the home page.
//
//curl -v -d "username=bob&password=secret" http://127.0.0.1:3000/login
//
/***** This version has a problem with flash messages
app.post('/login', 
passport.authenticate('local', { failureRedirect: '/login', failureFlash: true }),
function(req, res) {
res.redirect('/');
});
*/

//POST /login
//This is an alternative implementation that uses a custom callback to
//achieve the same functionality.
exports.login = function(req, res, next) {
  passport.authenticate('local', function(err, user, info) {
    if (err) { return next(err); }
    if (!user) {
      req.session.messages =  [info.message];
      return res.redirect('/login');
    }
    req.logIn(user, function(err) {
      if (err) { return next(err); }
      console.log('User ' + user.username + ' has logged in.');
      return res.redirect('/home');
    });
  })(req, res, next);
};

exports.logout = function(req, res) {
	var name = req.user.username;
	req.logout();
	console.log('User ' + name + ' has logged out.');
	res.redirect('/home');
};

exports.register = function(req, res) {
	var user = new User({ username: req.body.username, email: req.body.email, password: req.body.password });
	var profile = new Profile({ username: req.body.username, 
		                        email: req.body.email, 
		                        age: null, 
		                        address: null, 
		                        city: null, 
		                        zipcode: null,
		                        user: user});
	user.save(function(err) {
		if(err) {
			console.log(err);
	    } 
		else {
			console.log('New user: ' + user.username + " has register.");
			profile.save(function(err) {
    			if(err) {
    				console.log(err);
    		    } 
    			else {
    				console.log('Profile for user: ' + profile.username + " saved.");
    				req.logIn(user, function(err) {
    				      if (err) { return next(err); }
    				      return res.redirect('/home');
    				});
    			}
    		});			
		}
	});
};