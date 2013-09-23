/**
 * Profile controller
 */

var mongoose = require('mongoose')
  , db = require('../config/models/profile')
  , Profile = db.profileModel;

exports.update = function(req, res){
	var profile = req.body;
	Profile.update({'username':profile.username},profile,{safe:true}, function(err, result){
		if(err) {
			console.log('Error updating profile. ' + err);
			res.redirect('/');
		}
		else{
			console.log('' + result + ' profile updated for user: ' + profile.username);
			res.redirect('/');
		}			
	});
};

exports.load = function(req, res) {
	var user = req.user;
	Profile.findOne({ username: user.username }, function(err, profile) {
	    if (err) { 
	    	res.redirect('/'); 
	    }	    
	    res.render("profileUpdate", {
	  	  title: 'Profile',
	  	  id: 'profile',
	  	  profile: profile,
	  	  user: req.user
	    });
	});  
};
