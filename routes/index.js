var express = require('express');
var UserDB = require('../models/personel/user');
var credentials = require('../lib/credentials');
var session = require('express-session');



var router = express.Router();



router.get('/', function(req, res, next) {
  var session = req.session;
  session.auth = false;
  session.details = null;
  session.users = null;
  res.render('index');
});


router.post('/', function(req, res, next){
  var email = req.body.email;
  var password = req.body.password;
  var session = req.session;
  

  if(email.startsWith('admin')){  //TODO: Compare admin email from database record on later commit
      if(email.valueOf() == credentials.admin_email.valueOf() && password.valueOf() == credentials.admin_password.valueOf()){
     //TODO : pull admin record from database on later commit
     console.log("Login OK");
    session.auth = true;
    session.details = credentials.admin_name;
    session.users = null;
    
    res.redirect('/admin');
  }else{
    
    req.session.flash = {
				type: "danger",
				message: "Invalid Username or Password"
			};
			res.redirect(303, '/');
    console.log("Error");
  }
  }else{
    UserDB.find({'email':email}, function(err, docs){
      if(err){
        
      }else{
       // console.log(docs);
       // console.log(docs[0].department);
        if(password.valueOf() == docs[0].password.valueOf()){
          session.auth = true;
          session.details = docs[0].name;
          session.users = null;
          switch(docs[0].department){
          case 'pharmacy' : 
          res.redirect('/pharmacy/timeline');
          break;
          case 'doctor' :
          break;
          case 'records' :
          res.redirect('/records/');
          break;
          case 'account' :
          break;
          case 'nursing' :
          break;
          case 'laboratory' :
          break;
          default :
          req.session.flash = {
				type: "danger",
				message: "Access revoked. Contact Admin"
			};
			res.redirect(303, '/');
          break;
        }
        }else{
          req.session.flash = {
				type: "danger",
				message: "Invalid Username or Password"
			};
			res.redirect(303, '/');
        }
        
      }
    });
    
    
    
    
  }
  
  
  
  
  
  
  
  
  

  
});












module.exports = router;
