/**
 * Profile controller
 */

var mongoose = require('mongoose')
  , db = require('../config/models/profile')
  , Profile = db.profileModel
  , path = require ('path');

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
	    res.render(path.join(__dirname + '/../views/profile/jobs'), {
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
	    res.render(path.join(__dirname + '/../views/profile/jobOffers'), {
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
	    res.render(path.join(__dirname + '/../views/profile/profileUpdate'));
};

exports.dashboard = function(req, res) {
	var user = req.user;
	Profile.findOne({ username: user.username }, function(err, profile) {
	    if (err) { 
	    	res.redirect('/home'); 
	    }	    
	    res.render(path.join(__dirname + '/../views/profile/dashboard'), {
	  	  title: 'Dashboard',
	  	  id: 'profile',
	  	  profile: profile,
	  	  user: req.user
	    });
	});  
};

exports.newApplication = function(req, res) {
	var user = req.user;
	Profile.findOne({ username: user.username }, function(err, profile) {
	    if (err) { 
	    	res.redirect('/home'); 
	    }	    
	    res.render(path.join(__dirname + '/../views/profile/newApplication'), {
	  	  title: 'Dashboard',
	  	  id: 'profile',
	  	  profile: profile,
	  	  user: req.user
	    });
	});  
};

exports.applications = function(req, res) {
	var user = req.user;
	Profile.findOne({ username: user.username }, function(err, profile) {
	    if (err) { 
	    	res.redirect('/home'); 
	    }	    
	    res.render(path.join(__dirname + '/../views/profile/jobApplications'), {
	  	  title: 'Dashboard',
	  	  id: 'profile',
	  	  profile: profile,
	  	  user: req.user
	    });
	});  
};

exports.offerDetails = function(req, res) {
	var user = req.user;
	Profile.findOne({ username: user.username }, function(err, profile) {
	    if (err) { 
	    	res.redirect('/home'); 
	    }	    
	    res.render(path.join(__dirname + '/../views/profile/offerDetails'), {
	  	  title: 'Dashboard',
	  	  id: 'profile',
	  	  profile: profile,
	  	  user: req.user
	    });
	});  
};

exports.gridFooterTemplate = function (req, res) {
	res.render(path.join(__dirname + '/../views/profile/gridFooterTemplate'));
};

exports.gridCellTemplate = function (req, res) {
	res.render(path.join(__dirname + '/../views/profile/gridCellTemplate'));
};

exports.gridRowTemplate = function (req, res) {
	res.render(path.join(__dirname + '/../views/profile/gridRowTemplate'));
};

/*
 * REST API
 */
exports.profileAPI = function(req, res) {
	var user = req.user;
	Profile.findOne({ username: user.username }, function(err, profile) {
	    if (err) { 
	    	console.log('Error finding profile. ' + err); 
	    	res.send(JSON.stringify([]));
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
