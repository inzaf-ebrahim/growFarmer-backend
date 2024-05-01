const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const PaymentSchema = new Schema({
  paymentId: {
    type: String,
    required: true,
    unique: true // Ensures no duplicate payment IDs
  },
  productId: {
    type: Schema.Types.ObjectId,
    required: true,
    // ref: 'Product' // Reference to the Product model (assuming one exists)
  },
  userId: {
    type: Schema.Types.ObjectId,
    required: true,
    // ref: 'User' // Reference to the User model (assuming one exists)
  },
  amount: {
    type: Number,
    required: true,
    min: 0.01 // Enforces minimum payment amount (adjust as needed)
  },
  currency: {
    type: String,
    default: 'USD' // Default currency, can be customized
  },
  paymentDate: {
      type: Date,
      default: Date.now // Records timestamp of payment creation
    },
    paymentMethod: {
        type: String,
        default:'Wallet'
        // enum: ['credit card', 'debit card', 'e-wallet', 'other']
    },
    //   status: {
    //     type: String,
    //     required: true,
    //     enum: ['pending', 'succeeded', 'failed', 'canceled'],
    //     default: 'pending'
    //   },
//   paymentGateway: {
//     type: String
//     default:'razorpay'

//   },
//   details: {
//     type: Object // Flexible to store additional payment details
//   }
});

module.exports = mongoose.model('Payment', PaymentSchema);
