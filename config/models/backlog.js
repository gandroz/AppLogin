/**
 * Backlog entry Schema
 */
var mongoose = require('mongoose')
  , Schema = mongoose.Schema;

//Profile schema
var backlogSchema = new Schema({
	title: { type: String, required: true },
	importance: { type: Number, required: true },
	description: { type: String, required: true }
});

// Export profile model
var backlogModel = mongoose.model('BackLog', backlogSchema);
exports.backlogModel = backlogModel;