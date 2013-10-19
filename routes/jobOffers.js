/**
 * Job offer controller
 */
var mongoose = require('mongoose')
  , passport = require('passport')
  , dbJob= require('../config/models/jobOffers')
  , Job = dbJob.jobOfferModel
  , dbProfile = require('../config/models/profile')
  , Profile = dbProfile.profileModel;
  
/*
 * REST API
 */

exports.create = function(req, res) {
	var user = req.user;
	var job = new Job({ user: user, 
		                author: user.username,
		                title: req.body.title,
		                description: req.body.description,
		                salary: req.body.salary,
		                dueDate: new Date(req.body.dueDate),
		                category: req.body.category});
	job.save(function(err) {
		if(err) {
			console.log(err);
			res.redirect('/home');
	    } 
		else {
			console.log('New job for user: ' + user.username + " has been posted.");	
			//res.redirect('/offers');
			res.send(JSON.stringify(job));
		}
	});
};

exports.remove = function(req,res) {
	var jobId = req.params.jobId;
	Job.findByIdAndRemove(jobId, function(err, job) {
	    if (err) {
	    	console.log('An error hase occured while trying to delete job with Id: ' + jobId);
	    	res.redirect('/home'); 
	    }
	    else {
	        //res.redirect('/offers');
	        console.log('Job with Id ' + jobId + ' has well been removed from DB');
	        res.send(JSON.stringify(job));
	    }
	});
};

exports.jobById = function(req, res) {
	var id = req.params.jobId;
	Job.find({ _id: id }, function(err, job) {
	    if (err) { 
	    	res.redirect('/home'); 
	    }	    
	    res.send(JSON.stringify(job));
	});
};

exports.allMyJobs = function(req, res) {
	var user = req.user;    
	Job.find({ user: user }, function(err, jobs) {
	    if (err) { 
	    	res.redirect('/home'); 
	    }	    
	    res.send(JSON.stringify(jobs));
	});
};

exports.countAll = function(req, res) {
	Job.count(function(err,c){
		var count = {"count": c};
		res.send(JSON.stringify(count));
	});	
};

exports.sevenLastJobs = function(req, res) {
	Job.find({}).sort({postedDate: -1}).limit(7).exec(function(err, jobs) { 
		if(err) {
			console.log('Unable to retrieve last seven job offers.');
		}
		res.send(JSON.stringify(jobs));
	});
};

exports.all = function(req, res) {
	Job.find({}).sort({postedDate: -1}).exec(function(err, jobs) { 
		if(err) {
			console.log('Unable to retrieve last seven job offers.');
		}
		res.send(JSON.stringify(jobs));
	});
};