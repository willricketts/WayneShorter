var mongoose = require('mongoose');
var shortId = require('shortid');

var AudienceSchema = new mongoose.Schema({
  owner: String,
  links: {
    type: Number
  },
  first_seen: {
    type: Date,
    default: Date.now
  },
  last_seen: {
    type: Date,
    default: Date.now
  }
});

AudienceSchema.pre('save', function(next){
  now = new Date();
  this.updated_at = now;
  if ( !this.last_seen ) {
    this.last_seen = now;
  }
  next();
});

var Audience = mongoose.model('Audience', AudienceSchema);

module.exports = Audience;
