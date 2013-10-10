/**
 * Profile Schema
 */
var mongoose = require('mongoose')
  , Schema = mongoose.Schema;

//Profile schema
var profileSchema = new Schema({
	user: { type : Schema.ObjectId, ref : 'User' },
	username: { type: String, required: true, unique: true },
	email: { type: String, required: true, unique: true },
	age: { type: Number },
	address: { type: String },
	city: { type: String },
	zipcode: { type: String },
	telephone: { type: String },
	cellular: { type: String },
});

// Export profile model
var profileModel = mongoose.model('Profile', profileSchema);
exports.profileModel = profileModel;