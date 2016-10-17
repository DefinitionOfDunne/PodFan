var express = require('express');
var router = express.Router();
var Podcast = require('../models/podcast');
var request = require('request');
var xml2js = require('xml2js');

router.get('/', function(req, res, next) {
  var query = req.query.name;
  var itunesUrl = 'https://itunes.apple.com/search'

	request({url:itunesUrl, qs:{term:query, entity:'podcast'}}, function (error, response, body) {
		if (!error && response.statusCode == 200) {
		  var results = JSON.parse(body).results
		  console.log(results)
		  res.render('search_results', { podcasts: results });
		}
	})
});

module.exports = router;
