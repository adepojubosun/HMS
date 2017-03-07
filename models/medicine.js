/* 
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */

var mongoose = require('../../lib/db');
var Schema = mongoose.Schema;
var ObjectId = mongoose.Schema.Types.ObjectId;

var medicineschema = new Schema({
item: {type: ObjectId, ref: 'Item'},
  name:  String,
  activeComponent: String,
  quantity: Number,
  med_type: String,
  strength: String,
  manufacturer: String,
  supplier: String,
  sellingPrice: Number,
  costPrice: Number,
  category: String,  
  description: String    
});

module.exports = mongoose.model("Medicine", medicineschema);
