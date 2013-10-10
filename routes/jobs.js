/**
 * Job offer controller
 */
var mongoose = require('mongoose')
  , passport = require('passport')
  , dbJob= require('../config/models/jobOffers')
  , Job = dbJob.jobOfferModel;

/*
 * Create a Job
 */
exports.create = function(req, res) {
	var user = req.user;
	var job = new Job({ user: user, 
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
			res.send(JSON.stringify(job));
		}
	});
};

/*
 * Delete a job
 */
exports.remove = function(req,res) {
	var jobId = req.params.jobId;
	Job.findByIdAndRemove(jobId, function(err, job) {
	    if (err) { 
	    	res.redirect('/home'); 
	    }	
	    res.send(JSON.stringify(job));
	});
};

/*
 * Job by its title
 */
exports.jobByTitle = function(req, res) {
	var title = req.params.title;
	Job.findOne({title: title}, function(err, job){
		if (err) { 
	    	res.redirect('/home'); 
	    }	    
	    res.send(JSON.stringify(job));
	});
};

/*
 * Gets all my jobs
 */
exports.allMine = function(req, res) {
	var user = req.user;    
	Job.find({ user: user }, function(err, jobs) {
	    if (err) { 
	    	res.redirect('/home'); 
	    }	    
	    res.send(JSON.stringify(jobs));
	});
};

/*
 * Gets last seven jobs
 */
exports.sevenLastOffers = function(req, res) {
	Job.find({}).sort({postedDate: -1}).limit(7).exec(function(err, jobs) { 
		if(err) {
			console.log('Unable to retrieve last seven job offers.');
		}
		res.send(JSON.stringify(jobs));
	});
};

/*
 * Gets all jobs
 */
exports.all = function(req, res) {
	Job.find({}).sort({postedDate: -1}).exec(function(err, jobs) { 
		if(err) {
			console.log('Unable to retrieve last seven job offers.');
		}
		res.send(JSON.stringify(jobs));
	});
};