/**
 * Profile controller
 */

var mongoose = require('mongoose')
  , db = require('../config/models/profile')
  , Profile = db.profileModel;

/*
 * Main page
 */

/*
 * Partials
 */

exports.jobs = function (req, res) {
	var user = req.user;
	Profile.findOne({ username: user.username }, function(err, profile) {
	    if (err) { 
	    	res.redirect('/home'); 
	    }	    
	    res.render("jobs", {
	  	  title: 'Dashboard',
	  	  id: 'profile',
	  	  profile: profile,
	  	  user: req.user
	    });
	});
};

exports.offers = function(req, res) {
	var user = req.user;
	Profile.findOne({ username: user.username }, function(err, profile) {
	    if (err) { 
	    	res.redirect('/home'); 
	    }	    
	    res.render("jobOffers", {
	  	  title: 'Dashboard',
	  	  id: 'profile',
	  	  profile: profile,
	  	  user: req.user
	    });
	});  
};

exports.submissions = function(req, res) {
	var user = req.user;
	Profile.findOne({ username: user.username }, function(err, profile) {
	    if (err) { 
	    	res.redirect('/home'); 
	    }	    
	    res.render("jobSubmissions", {
	  	  title: 'Dashboard',
	  	  id: 'profile',
	  	  profile: profile,
	  	  user: req.user
	    });
	});  
};


exports.update = function(req, res){
	var profile = req.body;
	delete profile._id;
	Profile.update({'username':profile.username},profile,{safe:true}, function(err, result){
		if(err) {
			console.log('Error updating profile. ' + err);
			res.redirect('/profile');
		}
		else{
			console.log('' + result + ' profile updated for user: ' + profile.username);
			res.redirect('/profile');
		}			
	});
};

exports.profile = function(req, res) {
	var user = req.user;
	Profile.findOne({ username: user.username }, function(err, profile) {
	    if (err) { 
	    	res.redirect('/home'); 
	    }	    
	    res.render("profile", {
	  	  title: 'Dashboard',
	  	  id: 'profile',
	  	  profile: profile,
	  	  user: req.user
	    });
	});  
};

exports.profileUpdate = function(req, res) {		    
	    res.render("profileUpdate");
};

exports.dashboard = function(req, res) {
	var user = req.user;
	Profile.findOne({ username: user.username }, function(err, profile) {
	    if (err) { 
	    	res.redirect('/home'); 
	    }	    
	    res.render("dashboard", {
	  	  title: 'Dashboard',
	  	  id: 'profile',
	  	  profile: profile,
	  	  user: req.user
	    });
	});  
};

exports.application = function(req, res) {
	var user = req.user;
	Profile.findOne({ username: user.username }, function(err, profile) {
	    if (err) { 
	    	res.redirect('/home'); 
	    }	    
	    res.render("jobApplication", {
	  	  title: 'Dashboard',
	  	  id: 'profile',
	  	  profile: profile,
	  	  user: req.user
	    });
	});  
};


/*
 * REST API
 */
exports.profileAPI = function(req, res) {
	var user = req.user;
	Profile.findOne({ username: user.username }, function(err, profile) {
	    if (err) { 
	    	res.redirect('/home'); 
	    }	
	    res.send(JSON.stringify(profile));
	});  
};

exports.updateAPI = function(req, res){
	var profile = req.body;
	var id = profile._id;
	delete profile._id;
	Profile.update({_id:id},profile,{safe:true}, function(err, result){
		if(err) {
			console.log('Error updating profile. ' + err);
			res.send(JSON.stringify([]));
		}
		else{
			console.log('' + result + ' profile updated for user: ' + profile.username);
			res.send(JSON.stringify(profile));
		}			
	});
};
