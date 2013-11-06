/**
 * Application to a job Schema
 */
var mongoose = require('mongoose');

//Profile schema
var applicationSchema = new mongoose.Schema({
	user: { type : mongoose.Schema.ObjectId, ref : 'User', required: true },
	applicant: { type: String, required: true },
	proposal: { type: String },
	salary: { type: Number },
	dueDate: { type: Date },
	postedDate: { type: Date, default: Date.now },
	job: { type : mongoose.Schema.ObjectId, ref : 'JobOffer', required: true }
});

// Export profile model
var applicationModel = mongoose.model('Application', applicationSchema);
exports.applicationModel = applicationModel;