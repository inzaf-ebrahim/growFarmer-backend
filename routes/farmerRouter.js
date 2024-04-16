const express = require("express");
const router = express.Router();
const {
  AddProduct,
  getProduct,
  myproducts,
  productData,
  editProduct,
  deleteProduct,
} = require("../controller/farmerController");
const { uploads } = require("../util/multer");
const verifyToken = require("../middleware/verifyToken");

// router.post('/',AddProduct)
router.post("/upload", uploads.single("image"), AddProduct);
router.get("/download", getProduct);
router.get("/myproducts", verifyToken, myproducts);
router.get("/productData", productData);
router.put("/editProduct/:Id", uploads.single("image"), editProduct);
router.delete("/deleteProduct/:Id", deleteProduct);
module.exports = router;
