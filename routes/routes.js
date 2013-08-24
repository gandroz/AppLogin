var passport = require('passport'),
    db = require('../config/dbschema');

exports.index = function(req, res) {
	  res.render('index', { user: req.user });
	};

exports.account = function(req, res) {
  res.render("account", {
	  title: 'Account',
	  id: 'account',
      user: req.user
  });
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
//   acheive the same functionality.
exports.postlogin = function(req, res, next) {
  passport.authenticate('local', function(err, user, info) {
    if (err) { return next(err); }
    if (!user) {
      req.session.messages =  [info.message];
      return res.redirect('/login');
    }
    req.logIn(user, function(err) {
      if (err) { return next(err); }
      return res.redirect('/');
    });
  })(req, res, next);
};

exports.logout = function(req, res) {
  req.logout();
  res.redirect('/');
};

exports.getregister = function(req, res) {
    res.render('register', { });
};

exports.postregister = function(req, res) {
	var user = new db.userModel({ username: req.body.username, email: req.body.email, password: req.body.password });
	user.save(function(err) {
		if(err) {
			console.log(err);
	    } 
		else {
			console.log('user: ' + user.username + " saved.");
			req.logIn(user, function(err) {
			      if (err) { return next(err); }
			      return res.redirect('/');
			});
		}
	});
};


