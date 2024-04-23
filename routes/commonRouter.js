const express = require("express");
const router = express.Router();

const { Signup, Login, addToCart, cartDetails, ProductDetails, removeProduct } = require("../controller/commonController");
const verifyToken = require("../middleware/verifyToken");

router.post("/signup", Signup);
router.post("/login", Login);
router.post("/cart",verifyToken, addToCart);
router.get("/cartDetails",verifyToken, cartDetails);
router.get("/ProductDetails/:Id", ProductDetails);
router.patch("/removeProduct/:Id",removeProduct)

module.exports = router;
