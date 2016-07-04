var express = require('express');
var router = express.Router();
var pg = require('pg');
var Sequelize = require('sequelize');
var session = require('express-session');
var db = require('../modules/database');
var bodyParser = require('body-parser');

router.get('/', function(req, res) {

  res.render('vote')
});

module.exports = router;
