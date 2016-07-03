var express = require('express');
var router = express.Router();
var bodyParser = require('body-parser');
var bcrypt = require('bcrypt');
var session = require('express-session');
var Sequelize = require('sequelize');
var db = require('../modules/database.js');
var pg = require('pg');

router.get('/', function(req, res) {
	res.render('index', {title: 'musicvotes'});
});


router.post('/', bodyParser.urlencoded({
	extended: true
}), function(request, response) {
	db.user.findOne({
		where: {
			name: request.body.name
    }
	}).then(function(theuser) {
		var hashpassword = request.body.password;
		bcrypt.compare(hashpassword, theuser.password.toString(), function(err, result) {
			if (err !== undefined) {
				console.log(err);
			} else {
				console.log(result);
				if (theuser !== null && result === true) {
					request.session.user = theuser
					response.render('profile', {
						theuser: theuser
					});
				} else {
					console.log("gaat iets fout");
					response.redirect('/?message=' + encodeURIComponent("Invalid user name or password."));
				}
			}
    });
		});


	});

	module.exports = router;
