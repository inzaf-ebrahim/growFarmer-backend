const mongoose = require("mongoose");
const Schema = mongoose.Schema;
const Cart = new Schema({
  productIds: [{
    type: mongoose.Schema.Types.ObjectId,
    required: true,
  }],
  userId:{
    type: mongoose.Schema.Types.ObjectId,
    required:true
  }
});
module.exports = mongoose.model('cart',Cart)