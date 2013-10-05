exports.welcome = function(req, res) {
	res.render("welcome", {
		user: req.user
	});
};

exports.home = function(req, res) {
	  res.render("index", {
	  	  title: 'Home',
	  	  id: 'home',
	  	  user: req.user
	    });
	};
	
exports.index = function(req, res) {
	res.redirect('/home');
	};

exports.login = function(req, res) {
  res.render('login');
};

/*exports.about = function (req, res) {
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
};*/

exports.register = function(req, res) {
    res.render('register');
};
