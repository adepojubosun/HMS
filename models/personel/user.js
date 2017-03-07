/* 
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */

var mongoose = require('../../lib/db');
var Schema = mongoose.Schema;

var UserSchema = new Schema({    
  //  firstName: String,
 //   lastName: String,
    name: String,
    email: String,
    password: String,
    department: String
},
{ timestamps: { createdAt: Date.now } });

/*UserSchema.virtual('fullName').get(function () {
  return (this.lastName + ' ' + this.firstName);
});*/

module.exports = mongoose.model("User", UserSchema);
