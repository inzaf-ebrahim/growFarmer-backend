const express = require("express");
const router = express.Router();

const {
  Signup,
  Login,
  addToCart,
  cartDetails,
  ProductDetails,
  removeProduct,
  razorpayorder,
  verifyPayment,
} = require("../controller/commonController");
const verifyToken = require("../middleware/verifyToken");

router.post("/signup", Signup);
router.post("/login", Login);
router.post("/cart", verifyToken, addToCart);
router.get("/cartDetails", verifyToken, cartDetails);
router.get("/ProductDetails/:Id", ProductDetails);
router.patch("/removeProduct/:Id", removeProduct);
router.post("/razorpayorder", razorpayorder);
router.post("/verify-payment",verifyPayment)

module.exports = router;
