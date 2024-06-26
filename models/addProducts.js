const mongoose = require("mongoose");
const Schema = mongoose.Schema;
const AddProduct = new Schema({
  name: {
    type: String,
    required: true,
  },
  description: {
    type: String,
    required: true,
  },
  quantity: {
    type: Number,
    required: true,
  },
  price: {
    type: Number,
    required: true,
  },
  image: {
    type: String,
    required: true,
  },
  farmerid:{
    type: mongoose.Schema.Types.ObjectId,
    required:true
  }
});

module.exports = mongoose.model("products", AddProduct);
