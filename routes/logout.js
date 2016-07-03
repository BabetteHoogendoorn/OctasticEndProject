var express = require('express');
var router = express.Router();
var bodyParser = require('body-parser');
var session = require('express-session');

router.get('/', function(request, response) {
	request.session.destroy(function(error) {
		if (error) {
			throw error;
		}
		response.redirect('/?message=' + encodeURIComponent("Successfully logged out."));
	})
});

module.exports = router;
