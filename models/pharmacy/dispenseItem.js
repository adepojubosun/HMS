/* 
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */

var mongoose = require('../../lib/db');
var Schema = mongoose.Schema;
var ObjectId = mongoose.Schema.Types.ObjectId;

var dispItemSchema = new Schema({    
    medicine_id: {type: ObjectId, ref: 'Medicine'},
    quantity: Number,
    unit: String,    
    to: String,     //Student||Staff||Private    
    category: String,       // In/Out patient  
    //staff_id: {type: ObjectId, ref: 'Staff'},
    //patient_id: {type: ObjectId, ref: 'Patient'},
    dateDispensed: {type: Date, default: Date.now}
},
{ timestamps: { createdAt: Date.now } });

module.exports = mongoose.model("DispenseItem", dispItemSchema);
