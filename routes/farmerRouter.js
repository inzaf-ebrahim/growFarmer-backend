const express = require('express')
const router=express.Router()
const { AddProduct, getProduct, }=require('../controller/farmerController');
const { uploads } = require('../util/multer');

// router.post('/',AddProduct)
router.post("/upload",uploads.single('image'), AddProduct);
router.get("/download",getProduct );
module.exports = router;
