exports.index = function(req, res) {
	  res.render("index", {
	  	  title: 'Home',
	  	  id: 'home',
	  	  user: req.user
	    });
	};
	
exports.home = function(req, res) {
	res.redirect('/');
	};

exports.login = function(req, res) {
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

exports.register = function(req, res) {
    res.render('register');
};

exports.jobs = function (req, res) {
    res.render("jobs", {
    	title: 'Jobs', 
    	id: 'jobs',
        user: req.user
    });
};
