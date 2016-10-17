var mongoose = require('mongoose'),
  Schema = mongoose.Schema,
  passportLocalMongoose = require('passport-local-mongoose');

var request = require('request');
var xml2js = require('xml2js');


var episodeSchema = new Schema({
	title: {
		type: String,
		trim: true,
		max:200
	}, 
	description: {
		type: String,
    trim: true,
    max:2000
	},
	audioUrl: {
		type: String,
		required: true,
    trim: true,
    max:300
	},
	language: {
		type: String,
    trim: true,
    max:20
	},
	date: {
		type: Date,
	},
	author_id: {
  	type: Schema.Types.ObjectId,
  	ref: 'Podcast'
   }
});

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
	imageUrl: String,
	episodes: [episodeSchema]
});


podcastSchema.methods.parseUrl = function(callback) {
	var pod = this;
	request(pod.rssUrl, function (error, response, body) {
  	if (!error && response.statusCode == 200) {
  		xml2js.parseString(body, function (err, result) {
  			pod.title = result.rss.channel[0].title[0];
  			pod.description = result.rss.channel[0].description[0];
  			pod.website = result.rss.channel[0].link[0];
  			if(result.rss.channel[0]['itunes:image']){
  				pod.imageUrl = result.rss.channel[0]['itunes:image'][0]['$']['href']
  			}else if(result.rss.channel[0].image){
  				pod.imageUrl = result.rss.channel[0].image[0].url[0]
  			}
  			var episodes = result.rss.channel[0].item
				for (var i = 0; i < episodes.length; i++) {
					pod.episodes.push({
						title: episodes[i].title[0],
						description: episodes[i]['itunes:summary'][0],
						audioUrl: episodes[i]['feedburner:origEnclosureLink'][0],
						date: episodes[i].pubDate[0],
						author_id: pod._id
					})
				};
			});
  	}
  	callback(pod);
	})
};

// exports.Podcast = Podcast;
module.exports = mongoose.model('Podcast', podcastSchema);
module.exports = mongoose.model('Episode', episodeSchema);
