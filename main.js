var express = require('express');
var path = require('path');
var favicon = require('serve-favicon');
var logger = require('morgan');
var cookieParser = require('cookie-parser');
var bodyParser = require('body-parser');
var dburi = require('./config/db');
var shortId = require('shortid');
var app = express();

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs');
//app setup
app.use(logger('dev'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

// Require Schemas
var Link = require('./schema/Link');
var Log = require('./schema/Log');

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

//set up URL validator
var expression = /[-a-zA-Z0-9@:%_\+.~#?&//=]{2,256}\.[a-z]{2,4}\b(\/[-a-zA-Z0-9@:%_\+.~#?&//=]*)?/gi;
var regex = new RegExp(expression)

// Root route
app.get('/', function(req, res, next) {
  res.render('index', { title: 'WayneShorter'});
});

// Create shortlink
app.post('/shorten', function(req, res, next) {
  var b = req.body;
  var prefix = 'http://';
  if (b.payload.substr(0, prefix.length) !== prefix)
  {
    b.payload = prefix + b.payload;
  }

  if(b.payload.match(regex)) {
    Link.create({
      owner: req.connection.remoteAddress,
      payload: b.payload,
    }, function(err, link) {
      if(err) {
        res.send('whoops: ' + err);
      }
      else if(!link) {
        res.send(500);
      }
      res.send(JSON.stringify(link));
    })
  }
  else {
    Log.create({
      origin: req.connection.remoteAddress,
      message: 'Invalid URL submitted: ' + b.payload
    }, function(err, log) {
      if(err) {
        res.send('whoops');
      }
      res.send('Invalid URL');
    });
  }
});

// Consume shortlink
app.get('/:identifier', function(req, res, next) {
  Link.findOne({ identifier: req.params.identifier }, function(err, link) {
    if(err) {
      res.send('whoops');
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
