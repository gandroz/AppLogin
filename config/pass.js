
var passport = require('passport')
  , mongoose = require('mongoose')
  , LocalStrategy = require('passport-local').Strategy
  , FacebookStrategy = require('passport-facebook').Strategy
  , GoogleStrategy = require('passport-google').Strategy
  , dbProfile = require('../config/models/profile')
  , Profile = dbProfile.profileModel
  , dbUser = require('./models/user')
  , User = dbUser.userModel;

passport.serializeUser(function(user, done) {
  done(null, user.id);
});

passport.deserializeUser(function(id, done) {
	User.findById(id, function (err, user) {
    done(err, user);
  });
});

passport.use(new LocalStrategy(function(username, password, done) {
	User.findOne({ username: username }, function(err, user) {
       if (err) { return done(err); }
       if (!user) { return done(null, false, { message: 'Unknown user ' + username }); }
       user.comparePassword(password, function(err, isMatch) {
         if (err) return done(err);
         if(isMatch) {
           return done(null, user);
         } else {
           return done(null, false, { message: 'Invalid password' });
         }
       });
    });
}));

passport.use(new FacebookStrategy({
    clientID: "570895642989531",
    clientSecret: "b853de80ca89f2f09a4a9cb0b558c56c",
    callbackURL: "http://localhost:8080/auth/facebook/callback"
  },
  function(accessToken, refreshToken, profile, done) {
	  User.findOne({ username: profile.displayName, email: profile.emails[0].value }, function(err, olduser) {
		   if (err) { return done(err); }
	       if (olduser) { 
	    	   return done(null, olduser); 
	       }
	       else{
	    	   var birthday = new Date(profile._json.birthday);
	           var now = new Date;
	           var age = now.getFullYear() - birthday.getFullYear();
	           var ObjectId = mongoose.Types.ObjectId;
	    	   var newuser = new User({ 
	    		   username: profile.displayName, 
	    		   email: profile.emails[0].value,
	    		   fbId: profile.id,
	    		   strategy: 'facebook' });
	    	   var newprofile = new Profile({ 
	    		   username: profile.displayName, 
                   email: profile.emails[0].value, 
                   age: age, 
                   address: null, 
                   city: profile._json.location.name, 
                   zipcode: null,
                   user: newuser});
	    	   newuser.save(function(err,newuser) {
	    		   if(err) {
	    			   console.log(err);
	    			   }
	    		   else {
	    			   console.log('New user: ' + newuser.username + " has register.");
	    			   newprofile.save(function(err) {
	    				   if(err) {
	    					   console.log(err);
	    					   }
	    				   else {
	    					   console.log('Profile for user: ' + newprofile.username + " saved.");
	    					   done(null,newuser);
	    					   }
	    				   });
	    			   }
	    		   });
	       }
	  });
  })
);

passport.use(new GoogleStrategy({
    returnURL: 'http://localhost:8080/auth/google/return',
    realm: 'http://localhost:8080/'
  },
  function(identifier, profile, done) {
    User.findOrCreate({ openId: identifier }, function(err, user) {
      done(err, user);
    });
  }
));

// Simple route middleware to ensure user is authenticated.  Otherwise send to login page.
exports.ensureAuthenticated = function ensureAuthenticated(req, res, next) {
  if (req.isAuthenticated()) { return next(); }
  res.redirect('/login');
};