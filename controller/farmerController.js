const Products = require("../models/addProducts");
const upload = require("../util/multer");

const object = {
  AddProduct: async (req, res) => {
    try {
    const {  name, description, price, quantity } = req.body;
    console.log('files:',req.files);
    console.log("Form data:", req.body);
    // console.log("Uploaded file:", req.file);
    // res.send("File uploaded successfully");

      let newProduct = new Products({
        name: name,
        description: description,
        quantity: quantity,
        price: price,
        // image: req.file.path,
      });

      await newProduct.save();
      res.status(200).json({ inzaf: "product added successfully" });
    } catch (error) {
      console.log("error during add product ", error);
    }
  },
  
};
module.exports = object;
