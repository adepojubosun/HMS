var express = require('express');
var router = express.Router();


router.get('/', function(req, res, next){
	res.render('records/med-reg-a');
});

router.get('/form', function(req, res, next){
	res.render('records/med-reg-b');
});









module.exports = router;