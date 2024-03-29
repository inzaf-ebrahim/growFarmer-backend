const Products = require("../models/addProducts");
const upload = require("../util/multer");
const jwt = require('jsonwebtoken');

const object = {
  AddProduct: async (req, res) => {
    try {
      const { name, description, price, quantity } = req.body;
      console.log('files:',req.file.location);
      console.log("Form data:", req.body);
      const url = req.file.location;
      
      // Extracting token from Authorization header
      // const authHeader = req.headers['authorization'];
      // const token = authHeader && authHeader.split(' ')[1]; // Extracting token part
      // const secret = process.env.ACCESS_TOKEN;
      // if (!token) {
      //   return res.status(401).json({ message: "Unauthorized" });
      // }
      jwt.verify(token, secret, async (err, decoded) => {
        if (err) {
          // Token verification failed
          console.error('JWT verification failed:', err);
          return res.status(403).json({ message: "Forbidden" });
        } else {
          // Token verification successful, decoded contains the payload
          console.log('Decoded JWT payload:', decoded);
          // Extracting farmerid from decoded payload
          console.log(decoded._id);
          const decodedToken = req.decodedToken
          const farmerid = decodedToken._id; // Assuming 'farmerid' is present in the payload
          let newProduct = new Products({
            name: name,
            description: description   ,
            quantity: quantity, 
            price: price,
            image: url,
            farmerid: farmerid // Assigning farmerid from decoded payload
          }); 

          await newProduct.save();
          res.status(200).json({ inzaf: "product added successfully" });
        }
      });
    } catch (error) {
      console.log("error during add product ", error);
      res.status(500).json({ message: "Internal server error" });
    }
  },
  getProduct: async (req, res) => {
    try {
      const productData = await Products.find();
      res.status(200).json({ message: 'data saved', productData });
    } catch (error) {
      console.log("error during finding product ", error);
      res.status(500).json({ message: "Internal server error" });
    }
  },
  myproducts: async (req, res) => {
    const decodedtoken = req.decodedToken;
    const id = decodedtoken._id
    console.log(decodedtoken.email);
    console.log(id);
    try {
      const productData = await Products.find(
        {farmerid: id}
      );
      console.log(productData);
      res.status(200).json({ message: 'data saved', productData });
    } catch (error) {
      console.log("error during finding product ", error);
      res.status(500).json({ message: "Internal server error" });
    }
  }
};

module.exports = object;