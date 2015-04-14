var mongoose = require('mongoose');

var LogSchema = new mongoose.Schema({
  origin: String,
  message: String,
  created_at: {
    type: Date,
    default: Date.now
  }
});

var Log = mongoose.model('Log', LogSchema);

module.exports = Log;
