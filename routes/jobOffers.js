/**
 * Job offer controller
 */
var mongoose = require('mongoose')
  , passport = require('passport')
  , dbJob= require('../config/models/jobOffers')
  , Job = dbJob.jobOfferModel;
  
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
			res.redirect('/');
	    } 
		else {
			console.log('New job for user: ' + user.username + " has been posted.");	
			res.redirect('/');
		}
	});
};