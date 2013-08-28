var passport = require('passport'),
    db = require('../config/dbschema');

exports.index = function(req, res) {
	  res.render('index', { user: req.user });
	};
	
exports.home = function(req, res) {
	res.redirect('/');
	};

exports.getlogin = function(req, res) {
  res.render('login');
};

exports.about = function (req, res) {
    res.render("about", {
    	title: 'About', 
    	id: 'about',
        user: req.user
    });
};

exports.contact = function (req, res) {
    res.render("contact", {
    	title: 'Contact', 
    	id: 'contact',
        user: req.user
    });
};


// POST /login
//   Use passport.authenticate() as route middleware to authenticate the
//   request.  If authentication fails, the user will be redirected back to the
//   login page.  Otherwise, the primary route function function will be called,
//   which, in this example, will redirect the user to the home page.
//
//   curl -v -d "username=bob&password=secret" http://127.0.0.1:3000/login
//   
/***** This version has a problem with flash messages
app.post('/login', 
  passport.authenticate('local', { failureRedirect: '/login', failureFlash: true }),
  function(req, res) {
    res.redirect('/');
  });
*/
  
// POST /login
//   This is an alternative implementation that uses a custom callback to
//   achieve the same functionality.
exports.postlogin = function(req, res, next) {
  passport.authenticate('local', function(err, user, info) {
    if (err) { return next(err); }
    if (!user) {
      req.session.messages =  [info.message];
      return res.redirect('/login');
    }
    req.logIn(user, function(err) {
      if (err) { return next(err); }
      console.log('User ' + user.username + ' has logged in.');
      return res.redirect('/');
    });
  })(req, res, next);
};

exports.logout = function(req, res) {
	var name = req.user.username;
	req.logout();
	console.log('User ' + name + ' has logged out.');
	res.redirect('/');
};

exports.getregister = function(req, res) {
    res.render('register');
};

exports.postregister = function(req, res) {
	var user = new db.userModel({ username: req.body.username, email: req.body.email, password: req.body.password });
	var profile = new db.profileModel({ username: req.body.username, email: req.body.email, age: null, address: null, city: null, zipcode: null });
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
    				      return res.redirect('/');
    				});
    			}
    		});			
		}
	});
};

exports.getprofile = function(req, res) {
	var user = req.user;
	db.profileModel.findOne({ username: user.username }, function(err, profile) {
	    if (err) { 
	    	res.redirect('/'); 
	    }	    
	    res.render("profile", {
	  	  title: 'Profile',
	  	  id: 'profile',
	  	  profile: profile,
	  	  user: req.user
	    });
	});  
};

exports.postprofile = function(req, res) {
	var profile = req.body;
	db.profileModel.update({'username':profile.username},profile,{safe:true}, function(err, result){
		if(err) {
			console.log('Error updating profile. ' + err);
			res.redirect('/');
		}
		else{
			console.log('' + result + ' profile updated for user: ' + profile.username);
			res.redirect('/');
		}			
	});
};

