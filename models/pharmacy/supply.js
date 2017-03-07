/* 
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */

var mongoose = require('../../lib/db');
var Schema = mongoose.Schema;
var ObjectId = mongoose.Schema.Types.ObjectId;

var supplyschema = new Schema({
    invoiceNo: String,
    supplier: String,
    batchNo: String,
    item: {type: ObjectId, ref: 'Item'},
    quantity: Number,
    balance : Number,
    unit: String,
    lotNo: Number,
    expiryDate: Date,
    strength: String,
    dateSupplied: {type: Date, default: Date.now}
});

supplyschema.virtual('quantity_value').get(function () {
  return (this.quantity + ' ' + this.unit);
});

supplyschema.virtual('balance_value').get(function () {
  return (this.balance + ' ' + this.unit);
});

module.exports = mongoose.model("Supply", supplyschema);
