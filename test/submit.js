var assert = require('assert'),
    should = require('should'),
    request = require('request'),
    routes = require('../main');

describe('submission and consumption', function() {
  describe('Submit Link', function() {
    var post1 = { payload: 'http://google.com' }

    var post2 = { payload: 'google.com' }

    var post3 = { payload: 'asdfasdfasdf' }

    it('should accept a properly formatted create request with http', function(done) {
      request.post( 'http://localhost:3000/shorten', { form: post1 }, function(err, res, body) {
        should.not.exist(err);
        var response = JSON.parse(res.body);
        response.payload.should.equal('http://google.com');
        done();
      });
    });

    it('should accept a properly formatted create request without http', function(done) {
      request.post( 'http://localhost:3000/shorten', { form: post2 }, function(err, res, body) {
        should.not.exist(err);
        var response = JSON.parse(res.body);
        response.payload.should.equal('http://google.com');
        done();
      });
    });

    it('should reject an improperly formatted URL', function(done) {
      request.post( 'http://localhost:3000/shorten', { form: post3 }, function(err, res, body) {
        should.not.exist(err);
        var response = JSON.parse(res.body);
        response.error.should.equal('Invalid URL');
        done();
      });
    })
  });
});
