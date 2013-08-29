/**
 * Job Offers Schema
 */
var mongoose = require('mongoose')
  , Schema = mongoose.Schema;

//Profile schema
var jobOfferSchema = new Schema({
	user: { type : Schema.ObjectId, ref : 'User' },
	title: { type: String, required: true, unique: true },
	description: { type: String, required: true },
	salary: { type: Number },
	dueDate: { type: Date, required: true },
	postedDate: { type: Date, default: Date.now }
});

// Export profile model
var jobOfferModel = mongoose.model('JobOffer', jobOfferSchema);
exports.jobOfferModel = jobOfferModel;