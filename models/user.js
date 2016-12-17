var mongoose = require('mongoose'),
  Schema = mongoose.Schema,
  passportLocalMongoose = require('passport-local-mongoose');

var User = new Schema({
  username: { 
  	type: String, 
  	unique: true 
  },
  password: String,
  favorites: [{type: Schema.Types.ObjectId, ref: 'Podcast' }]
});

User.plugin(passportLocalMongoose);

module.exports = mongoose.model('User', User);