var express = require('express');
var values = require('../lib/values');
var Supply = require('../models/pharmacy/supply');
var Issue = require('../models/pharmacy/issue');
var DispenseItem = require('../models/pharmacy/dispenseItem');
var router = express.Router();
var Item = require('../models/pharmacy/item');
var ItemClass = require('../models/pharmacy/item_class');
var async = require('async');


//gets the item from database for purchase.....asynchronousity made me do this, javascript is a bitch lool
var getItemValue = function(val, callback){
    Item.findOne({'item':val}, function(err, doc){
		if(err){
			
		}else {
		callback(doc);
		}
	});
}














router.get('/timeline', function (req, res, next) {
    var session = req.session;
    res.render('pharmacy/timeline', {
        name : session.details
    });
});

router.get('/logout', function(req, res, next){
    var session = req.session;
	session.details = null;
  session.users = null;
	res.redirect("/");
});



router.get('/purchase/new', function (req, res, next) {
    var session = req.session;
    var sample_suppliers = [];
   // var med_cat = [];
   // var med = [];
    for (var i = 0; i < values[0].data.length; i++) {
        sample_suppliers.push(values[0].data[i]);
    }

    /*for (var i = 1; i < values.length; i++) {
        med_cat.push(values[i].property);
        med.push(values[i].data[0]);
    }
    //console.log(med);
    **/
    //fix multiple item classes when selecting items
    Item.find({}, function(err, docs){
		//console.log(docs);
		res.render('pharmacy/purchase', {
			suppliers : sample_suppliers,
			items : docs,//queries data from the item collection
            name : session.details
			});
			
	});

   

});



router.post('/purchase/new', function (req, res, next) {
   
   // console.log(req.body);
   var item_val = req.body.item;
       var invoice_val = req.body.invoiceNo;
       var supplier_val = req.body.supplier;
        var batch_val = req.body.batchNo;
       var quantity_val = req.body.quantity;
       var lot_no = req.body.lot_no;
        var expiry_val = new Date(req.body.expiryDate);
        var strength = req.body.strength;
        var unit = req.body.unit;
   
   getItemValue(item_val, function(item_doc){
        var supply = new Supply({
        invoiceNo : invoice_val,
        supplier : supplier_val,
        batchNo : batch_val,
        item : item_doc._id,//stores the reference to the item collection 
        unit : unit,
        lotNo : lot_no,
        quantity : quantity_val,
        expiryDate : expiry_val,
        strength : strength
    }).save(function (err) {
        if (!err) {
            console.log('data saved');
            res.redirect('/pharmacy/store/inventory');
        } else {
            console.log(err);
        }
    });
   });
    
   
});

router.get('/purchase/history', function(req, res, next){
    var session = req.session;
    Supply
        .find({})
        .populate('item','name')
        .exec(function(err, docs){
            if (err){
                console.log('Error Occured');
            }else{
              //  console.log(docs);
                res.render('pharmacy/purchase-history', {
             supply_data : docs,
             name : session.details
         });
            }
             
        });
});


router.get('/store/inventory', function (req, res, next) {
    var session = req.session;
        Supply
        .find({})
        .populate('item','name')
        .exec(function(err, docs){
            if (err){
                console.log('Error Occured');
            }else{
             //  console.log(docs);
                res.render('pharmacy/store-table', {
             supply_data : docs,
             name : session.details
         });
            }
             
        });   
});

router.get('/store/issue', function (req, res, next) {
    var session = req.session;
    res.render('pharmacy/store-issue', {
        name : session.details
    });
});


router.get('/store/issue/new', function (req, res, next) {
    var session = req.session;
    Item.find({}, function(err, docs){
		//console.log(docs);
		res.render('pharmacy/issue-form', {
			items : docs,//queries data from the item collection
            name : session.details
			});
			
	});
    
});

router.post('/store/issue/new', function (req, res, next) {
      var quantity;
      var unit;
      var todept;
      var from; 
});



router.get('/register', function (req, res, next){
    var session = req.session;
    ItemClass.find({}, function(err, docs){
        //console.log(docs);
        res.render('pharmacy/register', {
            item_classes : docs,
            name : session.details
        });
    });
    
     
});

router.post('/register', function(req, res, next){
    var item_name = req.body.name;
    var item_val = req.body.item;
    var meas = req.body.measurement;
    async.waterfall([
        function(callback){
        var item = new Item({
        item: item_val,
        name : item_name,
        measurement : meas
    }).save(function (err) {
        if (!err) {
            console.log('data saved');
           // res.redirect('/pharmacy/purchase/new');
        } else {
            console.log(err);
        }
    });
    callback(null);
        },
        function(callback){
            Item.findOne({'name':item_name}, function(err, item){
               callback(null, item); 
            });
        },
        function(item, callback){
            
        },
    ])

});



router.get('/dispensary/inventory', function (req, res, next) {
    var session = req.session;
    res.render('pharmacy/dispensary-inventory', {
        name : session.details
    });
});


router.get('/dispensary/history', function (req, res, next) {
    var session = req.session;
    res.render('pharmacy/dispensary-history', {
        name : session.details
    });
});


router.get('/dispensary/new', function (req, res, next) {
    var session = req.session;
    res.render('pharmacy/dispense-form', {
        name : session.details
    });
});

router.post('/dispensary/new', function (req, res, next) {

});






//+2348188555611
//+2348084113442















module.exports = router;