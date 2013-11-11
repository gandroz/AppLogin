/**
 * Job offer controller
 */
var mongoose = require('mongoose')
  , passport = require('passport')
  , dbJob= require('../config/models/jobOffers')
  , Job = dbJob.jobOfferModel
  , dbApplication= require('../config/models/application')
  , Application = dbApplication.applicationModel
  , dbProfile = require('../config/models/profile')
  , Profile = dbProfile.profileModel;
  
/*
 * REST API
 */

exports.create = function(req, res) {
	var user = req.user;
	var job = req.body.jobData;
	var application = new Application({
		user: user,
		applicant: user.username,
		proposal: req.body.proposal,
		salary: req.body.salary,
        dueDate: new Date(req.body.dueDate),
        job: job._id
	});
	application.save(function(err) {
		if(err) {
			console.log(err);
	    } 
		else {
			console.log(user.username + " just applied to job " + job._id + "(" + job.title + ")");	
			//res.redirect('/offers');
			res.send(JSON.stringify(application));
		}
	});
};

exports.remove = function(req,res) {
	var applicationId = req.params.applicationId;
	Application.findByIdAndRemove(jobId, function(err, job) {
	    if (err) {
	    	console.log('An error hase occured while trying to delete job with Id: ' + applicationId);
	    }
	    else {
	        //res.redirect('/offers');
	        console.log('Application with Id ' + applicationId + ' has well been removed from DB');
	        res.send(JSON.stringify(job));
	    }
	});
};

exports.applicationById = function(req, res) {
	var id = req.params.applicationId;
	Application.findById(id, function(err, application) {
	    if (err) { 
	    	console.log(err);
	    }	    
	    res.send(JSON.stringify(application));
	});
};

exports.allMyApplications = function(req, res) {
	var user = req.user;    
	Application.find({ user: user }).populate('job').exec( function(err, applications) {
	    if (err) { 
	    	console.log(err);
	    }	    
	    res.send(JSON.stringify(applications));
	});
};









