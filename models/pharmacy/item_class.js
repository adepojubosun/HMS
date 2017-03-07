var mongoose = require('../../lib/db');
var Schema = mongoose.Schema;
var ObjectId = mongoose.Schema.Types.ObjectId;

var itemClassSchema = new Schema({
  item_class: String,
  items : [
    {item_id: {type: ObjectId, ref: 'Item'}}
  ]   
});

module.exports = mongoose.model("ItemClass", itemClassSchema);