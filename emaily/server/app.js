var express = require('express');
const passport = require('passport');
const cookieSession = require('cookie-session');
const mongoose = require('mongoose');
var path = require('path');
var cookieParser = require('cookie-parser');
var logger = require('morgan');
const key = require('./config/key');
require('./services/passport');
const authRoutes = require('./routes/authRoutes');
const api = require('./routes/api');

mongoose.Promise = global.Promise;
mongoose.connect(key.mongoURI);

var app = express();

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

app.use(
  cookieSession({
    maxAge: 30 * 24 * 60 * 60 * 1000, //(ms)
    keys: [key.cookieKey]
  })
);

app.use(passport.initialize());
app.use(passport.session());

app.use('/auth/google',authRoutes);
app.use('/api',api);

module.exports = app;
