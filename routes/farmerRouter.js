const express = require("express");
const router = express.Router();
const {
  AddProduct,
  getProduct,
  myproducts,
} = require("../controller/farmerController");
const { uploads } = require("../util/multer");
const verifyToken = require("../middleware/verifyToken");

// router.post('/',AddProduct)
router.post("/upload", uploads.single("image"),verifyToken, AddProduct);
router.get("/download", getProduct);
router.get("/myproducts",verifyToken, myproducts);
module.exports = router;
