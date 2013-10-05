/**
 * Job offer controller
 */
var mongoose = require('mongoose')
  , passport = require('passport')
  , dbJob= require('../config/models/jobOffers')
  , Job = dbJob.jobOfferModel
  , dbProfile = require('../config/models/profile')
  , Profile = dbProfile.profileModel;
  

exports.jobs = function (req, res) {
	var user = req.user;
	Profile.findOne({ username: user.username }, function(err, profile) {
	    if (err) { 
	    	res.redirect('/home'); 
	    }	    
	    res.render("job", {
	  	  title: 'Profile',
	  	  id: 'profile',
	  	  profile: profile,
	  	  user: req.user
	    });
	});
};

exports.create = function(req, res) {
	var user = req.user;
	var job = new Job({ user: user, 
		                title: req.body.title,
		                description: req.body.description,
		                salary: req.body.salary,
		                dueDate: new Date(req.body.dueDate)});
	job.save(function(err) {
		if(err) {
			console.log(err);
			res.redirect('/home');
	    } 
		else {
			console.log('New job for user: ' + user.username + " has been posted.");	
			res.redirect('/offers');
		}
	});
};

exports.offers = function(req, res) {
	var user = req.user;
	Profile.findOne({ username: user.username }, function(err, profile) {
	    if (err) { 
	    	res.redirect('/home'); 
	    }	    
	    res.render("jobOffers", {
	  	  title: 'Profile',
	  	  id: 'profile',
	  	  profile: profile,
	  	  user: req.user
	    });
	});  
};

exports.offersByTitle = function(req, res) {
	var user = req.user;
	var job = new Job({ user: user, 
        title: "title",
        description: "description",
        salary: "salary",
        dueDate: Date.now});
	res.send(JSON.stringify(job));
};

exports.offersAPI = function(req, res) {
	var user = req.user;    
	Job.find({ user: user }, function(err, jobs) {
	    if (err) { 
	    	res.redirect('/home'); 
	    }	    
	    res.send(JSON.stringify(jobs));
	});
};

exports.submissions = function(req, res) {
	var user = req.user;
	Profile.findOne({ username: user.username }, function(err, profile) {
	    if (err) { 
	    	res.redirect('/home'); 
	    }	    
	    res.render("jobSubmissions", {
	  	  title: 'Profile',
	  	  id: 'profile',
	  	  profile: profile,
	  	  user: req.user
	    });
	});  
};

exports.sevenLastOffersAPI = function(req, res) {
	Job.find({}).sort({postedDate: -1}).limit(7).exec(function(err, jobs) { 
		if(err) {
			console.log('Unable to retrieve last seven job offers.');
		}
		res.send(JSON.stringify(jobs));
	});
};