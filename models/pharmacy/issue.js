/* 
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */

var mongoose = require('../../lib/db');
var Schema = mongoose.Schema;
var ObjectId = mongoose.Schema.Types.ObjectId;

var issueSchema = new Schema({        
    supply_id: {type: ObjectId, ref: 'Supply'},
    quantity: Number, //dont forget to take the quantity issued from quantity available = balance
    unit: String,
    toDept: String,     //A&E||Dispensary||Laboratory
    from: String,       //Store || Other
    fromDetails: String, //optional
    //staff_id: {type: ObjectId, ref: 'Staff'},
    dateIssued: {type: Date, default: Date.now}
},
{ timestamps: { createdAt: Date.now } });

issueSchema.virtual('quantity_value').get(function () {
  return (this.quantity + ' ' + this.unit);
});

module.exports = mongoose.model("Issue", issueSchema);
