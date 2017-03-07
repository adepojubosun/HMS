var mongoose = require('../../lib/db');
var Schema = mongoose.Schema;

var itemschema = new Schema({
  item:  String,
  name: String,
  measurement: String,   
});

module.exports = mongoose.model("Item", itemschema);