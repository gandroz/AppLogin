/**
 * User Schema
 */
var mongoose = require('mongoose'),
	bcrypt = require('bcrypt'),
	Schema = mongoose.Schema,
	SALT_WORK_FACTOR = 10;

// User schema
var UserSchema = new Schema({
  username: { type: String, required: true, unique: true },
  email: { type: String, required: true, unique: true },
  password: { type: String, required: true},
});


// Bcrypt middleware
UserSchema.pre('save', function(next) {
	var user = this;

	if(!user.isModified('password')) return next();

	bcrypt.genSalt(SALT_WORK_FACTOR, function(err, salt) {
		if(err) return next(err);

		bcrypt.hash(user.password, salt, function(err, hash) {
			if(err) return next(err);
			user.password = hash;
			next();
		});
	});
});

// Password verification
UserSchema.methods.comparePassword = function(candidatePassword, cb) {
	bcrypt.compare(candidatePassword, this.password, function(err, isMatch) {
		if(err) return cb(err);
		cb(null, isMatch);
	});
};

//Seed a user
//var UserModel = mongoose.model('User', userSchema);
//var user = new UserModel({ username: 'toto', email: 'toto@hotmail.com', password: 'toto' });
//user.save(function(err) {
//  if(err) {
//    console.log(err);
//  } else {
//    console.log('user: ' + user.username + " saved.");
//  }
//});

// Export user model
var userModel = mongoose.model('User', UserSchema);
exports.userModel = userModel;