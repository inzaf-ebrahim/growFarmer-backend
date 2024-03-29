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
    type: String,
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
  }
});

module.exports = mongoose.model("products", AddProduct);
