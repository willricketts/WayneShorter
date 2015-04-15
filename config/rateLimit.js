var Audience = require('../schema/Audience')

// Create Ratelimiter
var findOrCreateRateLimiter = function(req, res, callback) {
  Audience.findOne({ owner: req.connection.remoteAddress }, function(err, audience) {
    if(err) {
      res.send(500)
    }
    else if(!audience) {
      Audience.create({ owner: req.connection.remoteAddress }, function(err, audience) {
        if(err) {
          res.send(500);
        }
        else if(!audience) {
          res.send(500);
        }
        callback(audience);
      });
    }
    else {
      callback(audience);
    }
  });
}

module.exports = findOrCreateRateLimiter;
