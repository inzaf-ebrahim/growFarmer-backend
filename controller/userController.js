const Address = require("../models/address");
const Payment = require('../models/PaymentSchema')
const object = {
  address: async (req, res) => {
    console.log(req.body);
    const { name, mobileNumber, pincode, locality, address, state } = req.body;
    const newAddress = new Address({
      name,
      mobileNumber,
      pincode,
      locality,
      address,
      state,
    });
    await newAddress.save();
    res.status(200).json({message:'address saved successfully'})
  },
  paymentDetails:async (req,res)=>{
    try {
        console.log(req.body,'ideee');
        const {paymentId,productId,amount}=req.body
        const userId = req.decodedToken.id
        const paymentDetails = new Payment({
            paymentId,
            productId,
            userId,
            amount,
        })
        await paymentDetails.save()
        res.status(200).json({message:"paymentDetails saved successfully"})
    } catch (error) {
        console.log(error,'error in payment details');
    }

  }
};
module.exports = object;
