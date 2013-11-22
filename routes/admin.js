var mongoose = require('mongoose')
  , passport = require('passport')
  , dbJob= require('../config/models/jobOffers')
  , Job = dbJob.jobOfferModel
  , dbUser = require('../config/models/user')
  , User = dbUser.userModel
  , dbApplication= require('../config/models/application')
  , Application = dbApplication.applicationModel
  , dbProfile = require('../config/models/profile')
  , Profile = dbProfile.profileModel
  , path = require ('path');

/****************
 * Page view
 ****************/
exports.admin = function(req, res) {
	res.render("admin");
};

/*
 * Partials
 */
exports.partials = function(req, res) {
	var name = req.params.name;
	res.render(path.join(__dirname + '/../views/admin/' + name));
};

/****************
 *  PROFILE
 ****************/
exports.profileRemove = function(req,res) {
	var profileId = req.params.profileId;
	Profile.findByIdAndRemove(profileId, function(err, profile) {
	    if (err) {
	    	console.log('An error has occured while trying to delete profile with Id: ' + profileId);
	    }
	    else {
	        console.log('Profile with Id ' + profileId + ' has well been removed from DB');
	        res.send(JSON.stringify(profile));
	    }
	});
};

exports.profileList = function(req, res) {
	Profile.find({}).exec(function(err, profiles) { 
		if(err) {
			console.log('Unable to retrieve profiles.');
		}
		res.send(JSON.stringify(profiles));
	});
};

/****************
 *  Jobs
 ****************/
exports.jobRemove = function(req,res) {
	var jobId = req.params.jobId;
	Job.findByIdAndRemove(jobId, function(err, job) {
	    if (err) {
	    	console.log('An error has occured while trying to delete job with Id: ' + jobId);
	    }
	    else {
	        console.log('Job with Id ' + jobId + ' has well been removed from DB');
	        res.send(JSON.stringify(job));
	    }
	});
};

exports.jobList = function(req, res) {
	Job.find({}).exec(function(err, jobs) { 
		if(err) {
			console.log('Unable to retrieve jobs.');
		}
		res.send(JSON.stringify(jobs));
	});
};


/****************
 *  Users
 ****************/
exports.userRemove = function(req,res) {
	var userId = req.params.userId;
	User.findByIdAndRemove(userId, function(err, user) {
	    if (err) {
	    	console.log('An error has occured while trying to delete user with Id: ' + userId);
	    }
	    else {
	        console.log('User with Id ' + userId + ' has well been removed from DB');
	        res.send(JSON.stringify(user));
	    }
	});
};

exports.userList = function(req, res) {
	User.find({}).exec(function(err, users) { 
		if(err) {
			console.log('Unable to retrieve users.');
		}
		res.send(JSON.stringify(users));
	});
};

/****************
 *  Applications
 ****************/
exports.applicationRemove = function(req,res) {
	var applicationId = req.params.applicationId;
	Application.findByIdAndRemove(applicationId, function(err, application) {
	    if (err) {
	    	console.log('An error has occured while trying to delete application with Id: ' + applicationId);
	    }
	    else {
	        console.log('Application with Id ' + applicationId + ' has well been removed from DB');
	        res.send(JSON.stringify(application));
	    }
	});
};

exports.applicationList = function(req, res) {
	Application.find({}).exec(function(err, applications) { 
		if(err) {
			console.log('Unable to retrieve applications.');
		}
		res.send(JSON.stringify(applications));
	});
};