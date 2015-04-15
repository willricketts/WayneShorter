var express = require('express');
var path = require('path');
var favicon = require('serve-favicon');
var logger = require('morgan');
var cookieParser = require('cookie-parser');
var bodyParser = require('body-parser');
var shortId = require('shortid');
var validator = require('validator');
var app = express();

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs');
//app setup
app.use(favicon(__dirname + '/public/favicon.ico'));
app.use(logger('dev'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

// Require Helpers
var dburi = require('./config/db');
var rateLimitCreate = require('./config/rateLimit');

// Require Schemas
var Link = require('./schema/Link');
var Log = require('./schema/Log');
var Audience = require('./schema/Audience');

// Default error
var genericError = JSON.stringify({ error: 'serverError' });

// Connect to mongoLab
var mongoose = require('mongoose');
mongoose.connect(dburi, function(err) {
  if(err) {
    console.log('Could not connect to DB: ' + err);
  }
  else {
    console.log('Connected to DB')
  }
});

// Root route
app.get('/', function(req, res, next) {
  res.render('index', { title: 'WayneShorter'});
});

// Create shortlink
app.post('/shorten', function(req, res, next) {
  var b = req.body;
  var prefix = 'http://';

  if(b.payload.indexOf('http') != 0) {
    if(b.payload.indexOf('https') != 0) {
      if(b.payload.indexOf('ftp') != 0) {
        b.payload = prefix + b.payload;
      }
    }
  }

  if(validator.isURL(b.payload.toString())) {
    rateLimitCreate(req, res, function(audience) {
      var lastSeen = Date.parse(audience.last_seen);
      var currentTimestamp = Date.parse(new Date());
      if(((currentTimestamp - lastSeen) >= 1000) || (currentTimestamp == lastSeen)) {
        Link.create({
          owner: req.connection.remoteAddress,
          payload: b.payload,
        }, function(err, link) {
          if(err) {
            res.send(genericError);
          }
          else if(!link) {
            res.send(genericError);
          }

          var output = {
            payload: link.payload,
            identifier: link.identifier,
            shortlink: 'http://shrtr.in/' + link.identifier
          }
          Audience.findOneAndUpdate({ owner: req.connection.remoteAddress }, { last_seen: currentTimestamp }, function(err, audience) {
            if(err) {
              res.send(genericError);
            }
            else if(!audience) {
              res.send(genericError);
            }
            res.send(JSON.stringify(output));
          });
        });
      }
      else {
        Audience.findOneAndUpdate({ owner: req.connection.remoteAddress }, { last_seen: currentTimestamp }, function(err, audience) {
          if(err) {
            res.send(genericError);
          }
          else if(!audience) {
            res.send(genericError);
          }
          Log.create({
            origin: req.connection.remoteAddress,
            type: 'rateLimit',
            message: 'User was rate limited'
          }, function(err, log) {
            if(err) {
              res.send(genericError);
            }
            else if(!log) {
              res.send(genericError);
            }
            res.send(JSON.stringify({ error: 'rateLimit' } ));
          });
        });
      }
    });

  }
  else {
    Log.create({
      origin: req.connection.remoteAddress,
      type: 'invalidUrl',
      message: 'Invalid URL submitted: ' + b.payload
    }, function(err, log) {
      if(err) {
        res.send(genericError);
      }
      res.json({ error: 'invalidUrl' });
    });
  }
});

// Consume shortlink
app.get('/:identifier', function(req, res, next) {
  Link.findOne({ identifier: req.params.identifier }, function(err, link) {
    if(err) {
      res.send(genericError);
    }
    if(!link) {
      res.redirect('/');
    }

    if(link) {
      res.redirect(link.payload);
    }

  });
});

// catch 404 and forward to error handler
app.use(function(req, res, next) {
  var err = new Error('Not Found');
  err.status = 404;
  next(err);
});

// error handlers

// development error handler
// will print stacktrace
if (app.get('env') === 'development') {
  app.use(function(err, req, res, next) {
    res.status(err.status || 500);
    res.render('error', {
      message: err.message,
      error: err
    });
  });
}

// production error handler
// no stacktraces leaked to user
app.use(function(err, req, res, next) {
  res.status(err.status || 500);
  res.render('error', {
    message: err.message,
    error: {}
  });
});


module.exports = app;
