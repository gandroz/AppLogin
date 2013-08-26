var mongoose = require('mongoose'),
	bcrypt = require('bcrypt'),
	SALT_WORK_FACTOR = 10;
exports.mongoose = mongoose;

// Database connect
var uristring = 
  process.env.MONGOLAB_URI || 
  process.env.MONGOHQ_URL || 
  'mongodb://localhost/test';

var mongoOptions = { db: { safe: true }};

mongoose.connect(uristring, mongoOptions, function (err, res) {
  if (err) { 
    console.log ('ERROR connecting to: ' + uristring + '. ' + err);
  } else {
    console.log ('Successfully connected to: ' + uristring);
  }
});

//******* Database schema TODO add more validation
var Schema = mongoose.Schema, 
	ObjectId = Schema.ObjectId;

// User schema
var userSchema = new Schema({
  username: { type: String, required: true, unique: true },
  email: { type: String, required: true, unique: true },
  password: { type: String, required: true},
});


// Bcrypt middleware
userSchema.pre('save', function(next) {
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
userSchema.methods.comparePassword = function(candidatePassword, cb) {
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
var userModel = mongoose.model('User', userSchema);
exports.userModel = userModel;

//Profile schema
var profileSchema = new Schema({
  username: { type: String, required: true, unique: true },
  email: { type: String, required: true, unique: true },
  age: { type: Number },
  address: { type: String },
  city: { type: String },
  zipcode: { type: String },
});

// Export profile model
var profileModel = mongoose.model('Profile', profileSchema);
exports.profileModel = profileModel;