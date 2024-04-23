const User = require("../models/userSchema");
const Farmer = require("../models/farmerSchema");
const Admin = require("../models/adminSchema");
const jwt = require("jsonwebtoken");
const Cart = require("../models/cartSchema");
const { use } = require("../routes/commonRouter");
const Products = require("../models/addProducts");

const object = {
  Signup: async (req, res) => {
    const { name, email, password, role } = req.body;
    console.log(req.body);
    try {
      let newUser;
      if (role === "user") {
        const existingUser = await User.findOne({ email: email });
        if (existingUser) {
          return res
            .status(400)
            .json({ message: "User already exists, please login" });
        }
        newUser = new User({
          name: name,
          email: email,
          password: password,
        });
        await newUser.save();
        const payload = { id: newUser._id, email: newUser.email, role: role };
        const secret = process.env.ACCESS_TOKEN;
        const token = jwt.sign(payload, secret);
        res
          .status(200)
          .json({ message: `${role} signup successful`, token: token });
      } else if (role === "farmer") {
        const existingFarmer = await Farmer.findOne({ email: email });
        if (existingFarmer) {
          return res
            .status(400)
            .json({ message: "Farmer already exists, please login" });
        }
        newUser = new Farmer({
          name: name,
          email: email,
          password: password,
        });
        await newUser.save();
        const payload = { id: newUser._id, email: newUser.email, role: role };
        const secret = process.env.ACCESS_TOKEN;
        const token = jwt.sign(payload, secret);
        res
          .status(200)
          .json({ message: `${role} signup successful`, token: token });
      } else {
        return res.status(400).json({ message: "Invalid role" });
      }

      // const payload = { _id: newUser._id, email: newUser.email, role: role };
      // const secret = process.env.ACCESS_TOKEN;
      // const token = jwt.sign(payload, secret);
      // res.status(200).json({ message: `${role} signup successful`, token: token });
    } catch (error) {
      console.error("Error during signup:", error);
      res.status(500).json({ message: "Internal server error" });
    }
  },
  Login: async (req, res) => {
    const { email, password, role } = req.body;
    try {
      if (role == "user") {
        console.log("user is here");
        const existingUser = await User.findOne({ email: email });
        if (!existingUser) {
          return res.status(400).json({ message: "User not found" });
        }
        if (existingUser.password !== password) {
          return res.status(400).send({ message: "Invalid password" });
        }
        const secret = process.env.ACCESS_TOKEN;
        const token = jwt.sign({ id: existingUser._id }, secret, {
          expiresIn: "10d",
        });
        res.status(200).json({ message: "Login successful", token: token });
      } else if (role == "farmer") {
        console.log("farmer is here");
        const existingFarmer = await Farmer.findOne({ email: email });
        if (!existingFarmer) {
          return res.status(400).json({ message: "Farmer not found" });
        }
        if (existingFarmer.password !== password) {
          return res.status(400).send({ message: "Invalid password" });
        }
        const secret = process.env.ACCESS_TOKEN;
        const token = jwt.sign({ id: existingFarmer._id }, secret, {
          expiresIn: "10d",
        });
        res.status(200).json({ message: "Login successful", token: token });
      } else if (role == "admin") {
        console.log("admin is here");
        const existingAdmin = await Admin.findOne({ email: email });
        console.log(existingAdmin);
        if (!existingAdmin) {
          return res.status(400).json({ message: "Admin not found" });
        }
        if (existingAdmin.password !== password) {
          return res.status(400).send({ message: "Invalid password" });
        }
        const secret = process.env.ACCESS_TOKEN;
        const token = jwt.sign({ id: existingAdmin._id }, secret, {
          expiresIn: "10d",
        });
        res.status(200).json({ message: "Login successful", token: token });
      } else {
        console.log("login error");
      }
    } catch (error) {
      console.error("Error during login:", error);
      res.status(500).json({ message: "Internal server error" });
    }
  },
  addToCart: async (req, res) => {
    const productId = req.body.id;
    const userId = req.decodedToken.id;
  
    try {
      const existingCart = await Cart.findOne({ userId: userId });
  
      if (existingCart) {
        // Check if the product already exists in the cart
        const existingProduct = existingCart.productIds.find(id => id.toString() === productId); // Handle potential string/object ID comparison
  
        if (existingProduct) {
          return res.status(400).json({ message: "Product already exists in your cart" });
        } else {
          existingCart.productIds.push(productId);
          await existingCart.save();
          res.status(200).json({ message: "Product added to your cart successfully", existingCart });
        }
      } else {
        const newItem = new Cart({
          userId,
          productIds: [productId],
        });
        await newItem.save();
        res.status(200).json({ message: "Your cart item saved successfully", newItem });
      }
    } catch (error) {
      console.error("Error during add to cart:", error);
      res.status(500).json({ message: "Internal server error" });
    }
  },
  
  cartDetails: async (req, res) => {
    const userId = req.decodedToken.id;
    try {
      const usercart = await Cart.find({ userId: userId });

      if (usercart) {
        res.status(200).json({ message: "Cart items", usercart });
      } else {
        res.status(200).json({ message: "Your cart is currently empty" });
      }
    } catch (error) {
      console.error("Error during :", error);
      res.status(500).json({ message: "Error retrieving cart details" }); // Handle error in response
    }
  },
  ProductDetails: async (req, res) => {
    const Id = req.params.Id;
    console.log("product id is:", Id);
    try {
      const ProductDetails = await Products.findById(Id);
      console.log(ProductDetails, "this is the details");
      res
        .status(200)
        .json({ message: "details of each product", ProductDetails });
    } catch (error) {
      console.error("Error during :", error);
    }
  },
  removeProduct: async (req, res) => {
    try {
      const cartId = req.body.cartId; 
      const Id = req.params.Id;

      if (!Id || !cartId) {
        return res
          .status(400)
          .json({ message: "Missing required fields (Id, cartId)" });
      }

      // Use findByIdAndUpdate with $pull operator to remove product from cart
      const updatedCart = await Cart.findByIdAndUpdate(cartId, {
        $pull: { productIds: Id },
      });

      if (!updatedCart) {
        return res
          .status(404)
          .json({ message: "Cart not found or product already removed" });
      }

      res.status(200).json({ message: "Product removed successfully" });
    } catch (error) {
      console.error(error);
      res.status(500).json({ message: "Internal server error" });
    }
  },
};
module.exports = object;
