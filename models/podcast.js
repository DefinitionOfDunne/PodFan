var mongoose = require('mongoose'),
  Schema = mongoose.Schema,
  passportLocalMongoose = require('passport-local-mongoose');

var request = require('request');
var xml2js = require('xml2js');

var podcastSchema = new Schema ({
	title: {
		required: true,
		type: String,
	  trim: true,
	  max: 100
	},
	rssUrl: {
		required: true,
		type: String,
	  trim: true,
	  max: 300,
	},
	description: {
		type: String,
	  trim: true,
	  max: 300
	},
	website: {
		type: String,
	  trim: true,
	  max: 100
	},
	imageUrl: String
});


// exports.Podcast = Podcast;
module.exports = mongoose.model('Podcast', podcastSchema);
