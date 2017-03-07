var express = require('express');
var path = require('path');
var favicon = require('serve-favicon');
var logger = require('morgan');
var cookieParser = require('cookie-parser');
var bodyParser = require('body-parser');
var sessions = require('express-session');
var swig = require('swig');

var index = require('./routes/index');
var pharmacy = require('./routes/pharmacy');
var admin = require('./routes/admin');
var records = require('./routes/records');

var credentials = require('./lib/credentials');

var app = express();

// view engine setup
app.engine('html',swig.renderFile);
app.set('view cache', false);
swig.setDefaults({ cache: false });
app.set('views', path.join(__dirname, 'views'));

app.set('view engine', 'html');


// uncomment after placing your favicon in /public
//app.use(favicon(path.join(__dirname, 'public', 'favicon.ico')));
app.use(logger('dev'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

//sessions
app.use(sessions({resave: true, saveUninitialized: true, secret: credentials.secret}));

app.use(function(req, res, next){
  //adding csruf
  //	res.cookie('XSRF-TOKEN', req.csrfToken());
  //	res.locals._csrfToken = req.csrfToken();
  // if there's a flash message, transfer
  // it to the context, then clear it
  	res.locals.flash = req.session.flash;
  	delete req.session.flash;

	res.locals.user = req.session.user;
	next();
});

app.use('/', index);
app.use('/admin', admin);
app.use('/pharmacy', pharmacy);
app.use('/records', records);


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
