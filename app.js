var express = require('express');
var path = require('path');
var bodyParser = require('body-parser');
var fs = require('fs');
var pg = require('pg');
var session = require('express-session');
var app = express();

// Session config
app.use(session({
  secret: 'oh wow very secret much security',
  resave: true,
  saveUninitialized: false,
  cookie: {
    expires: false
  }
}));
app.use(function(req,res,next){
  console.log('main triggered ' + Date.now())
  next()
})

// Get all routes
var routes = require('./routes/');
var index = require('./routes/index');
var signup = require('./routes/signup');
var login = require ('./routes/login');
var profile = require('./routes/profile');
var logout = require ('./routes/logout');
var vote = require ('./routes/vote')


// Get database configuration
var db = require('./modules/database')

// view engine setup
app.set('views', './views');
app.set('view engine', 'jade');


app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
//app.use(cookieParser());

// use routes
app.use('/', routes);
app.use('/signup', signup);
app.use('/logout', logout);
app.use('/profile', profile);
app.use('/index', index);
app.use('/vote', vote);

// Static files
app.use(express.static('./public'));
app.use('/search', express.static('./public'));

// // wat is dit?
// if (app.get('env') === 'development') {
//   app.use(function(err, req, res, next) {
//     res.status(err.status || 500);
//     res.render('error', {
//       message: err.message,
//       error: err
//     });
//   });
// }
//
// //en dit?
// app.use(function(err, req, res, next) {
//   res.status(err.status || 500);
//   res.render('error', {
//     message: err.message,
//     error: {}
//   });
// });


app.listen(7000)
