var mongoose = require('mongoose');
var shortId = require('shortid');

var LinkSchema = new mongoose.Schema({
  owner: String,
  payload: String,
  identifier: {
    type: String,
    unique: true,
    default: shortId.generate
  },
  created_at: {
    type: Date,
    default: Date.now
  }
});

var Link = mongoose.model('Link', LinkSchema);

module.exports = Link;
