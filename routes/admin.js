var express = require('express');
var credentials = require('../lib/credentials');
var UserDB = require('../models/personel/user');
var router = express.Router();

router.get('/', function(req, res, next){
	var session = req.session;
	//get admin record from database
	var email = credentials.admin_email;
	var name = session.details;
	res.render('admin', 
	{ 
		name : name
	});
});


router.post('/', function(req, res, next){
	var name = req.body.name;
    var email = req.body.email;
	var password = "password";
	var department = req.body.department;
	
	var user = new UserDB({
		name : name,
		email : email,
		password : password,
		department : department,
	}).save(function (err) {
        if (!err) {
            console.log('data saved');
            res.redirect('/admin/list');
        } else {
            console.log(err);
        }
    });
});

router.get('/list', function(req, res, next){
	var session = req.session;
	    UserDB.find({}, function(err, docs){
		console.log(docs);
		res.render('admin-list', {
			users : docs,//queries data from the item collection
			name : session.details
			});
			
	});
	
});


router.get('/logout', function(req, res, next){
  var session = req.session;
	session.details = null;
  session.users = null;
	res.redirect("/");
});





module.exports = router;