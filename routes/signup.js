var express = require('express');
var router = express.Router();
var bodyParser = require('body-parser');
var bcrypt = require('bcrypt');
var db = require('../modules/database');
var pg = require('pg');
var Sequelize = require('sequelize');
var session = require('express-session');


router.get('/', function(request, response){
		response.render('signup', {title: 'signup'})
	});

	//stores data in database
	router.post('/', bodyParser.urlencoded({extended: true}), function (request, response) {
		bcrypt.hash(request.body.password, 10, function (err, hash) {
			if(err) {
				console.log(err)
			}
			console.log(hash);
			db.user.create({
				name:request.body.name,
				email: request.body.email,
				password:hash
			}).then (function () {
				response.redirect('/index')
			});
		});
	});

module.exports = router;
