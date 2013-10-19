/**
 * Job offer controller
 */
var mongoose = require('mongoose')
  , passport = require('passport')
  , dbBacklog= require('../config/models/backlog')
  , BacklogEntry = dbBacklog.backlogModel;
  
/*
 * REST API
 */
exports.all = function(req, res) {
	BacklogEntry.find().sort({importance: 1}).exec(function(err, logentry) { 
		if(err) {
			console.log('Unable to retrieve backlog entry.');
		}
		res.send(JSON.stringify(logentry));
	});
};

exports.create = function(req, res) {
	var logEntry = new BacklogEntry(req.body);
	logEntry.save(function(err) {
		if(err) {
			console.log(err);
			res.redirect('/home');
	    } 
		else {
			console.log('New backlog entry has been posted.');	
			res.send(JSON.stringify(logEntry));
		}
	});
};

exports.update = function(req, res) {
	var Id = req.params.Id;
	var entry = req.body;
	delete entry._id;
	BacklogEntry.update({_id: Id}, entry, {safe:true, upsert: true}, function(err, result){
		if(err) {
			console.log('Error updating profile. ' + err);
			res.redirect('/home');
		}
		else{
			console.log(result + ' backlog entry updated');
			entry._id = Id;
			res.send(JSON.stringify(entry));
		}			
	});
};

exports.remove = function(req,res) {
	var Id = req.params.Id;
	BacklogEntry.findByIdAndRemove(Id, function(err, entry) {
	    if (err) {
	    	console.log('An error hase occured while trying to delete backlog entry with Id: ' + Id);
	    	res.redirect('/home'); 
	    }
	    else {
	        //res.redirect('/offers');
	        console.log('Backlog entry with Id ' + Id + ' has well been removed from DB');
	        res.send(JSON.stringify(entry));
	    }
	});
};