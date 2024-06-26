var createError = require('http-errors');
var express = require('express');
var path = require('path');
var cookieParser = require('cookie-parser');
var logger = require('morgan');

var indexRouter = require('./routes/index');
var usersRouter = require('./routes/users');

var app = express();

var logger = require('morgan');
const mongoose = require('mongoose');
var session = require('express-session');
var FileStore = require('session-file-store')(session);

var passport = require('passport');
var config = require('./config');

var auth = require('./authenticate')();

url = config.mongoUrl;

var cityRouter = require('./routes/cityRouter');
var warehouseRouter = require('./routes/warehouseRouter');
var stateRouter = require('./routes/stateRouter');

const connect = mongoose.connect(url);

connect.then((db) => {
  console.log(`Connected correctly to server ${config.mongoUrl}`);
}, (err) => { console.log(err); });


// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'jade');

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));


//passport authenticateion
app.use(auth.initialize());

app.use('/', indexRouter);
app.use('/users', usersRouter);

app.use('/cities', cityRouter);
app.use('/states', stateRouter);
app.use('/warehouse', warehouseRouter);


// catch 404 and forward to error handler
app.use(function(req, res, next) {
  next(createError(404));
});

// error handler
app.use(function(err, req, res, next) {
  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get('env') === 'development' ? err : {};

  // render the error page
  res.status(err.status || 500);
  res.render('error');
});

module.exports = app;
