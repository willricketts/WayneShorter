var mongoose = require('mongoose');

var LinkSchema = new mongoose.Schema({
  owner: String,
  payload: String,
  identifier: String
  created_at: {
    type: Date,
    default: Date.now
  }
});

var Link = mongoose.model('Link', LinkSchema);

module.exports = Link;
