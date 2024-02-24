const Products = require("../models/addProducts");
const upload = require("../util/multer");

const object = {
  AddProduct: async (req, res) => {
    try {
    const {  name, description, price, quantity } = req.body;
    console.log('files:',req.file.location);
    console.log("Form data:", req.body);
    const url = req.file.location 

      let newProduct = new Products({
        name: name,
        description: description,
        quantity: quantity,
        price: price,
        image: url
      });

      await newProduct.save();
      res.status(200).json({ inzaf: "product added successfully" });
    } catch (error) {
      console.log("error during add product ", error);
    }
  },
  getProduct:async(req,res)=>{
    try {
      const productData = await Products.find()
      // res.send(`data saved:${productData}`)
      res.status(200).json({message:'data saved', productData});

    } catch (error) {
      console.log("error during finding product ", error);
      
    }
  //  console.log(store);
  }
  
};
module.exports = object;
