const express = require("express");
const router = express.Router();
const { address, paymentDetails } = require("../controller/userController");
const verifyToken =require('../middleware/verifyToken')

router.post("/address", address);
router.post("/paymentDetails",verifyToken,paymentDetails)
module.exports = router;
