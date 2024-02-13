const User = require("../models/userSchema");
const Farmer = require("../models/farmerSchema");
const Admin = require("../models/adminSchema");

const object = {
  postSignup: async (req, res) => {
    const { name, email, password, role } = req.body;
    console.log(req.body);
    if (role == "user") {
      const newUser = new User({
        name: name,
        email: email,
        password: password,
      });
      await newUser.save();
      res.send({ hello: " helo user data recieved" });
    } else if (role == "farmer") {
      const newFarmer = new Farmer({
        name: name,
        email: email,
        password: password,
      });
      await newFarmer.save();
      res.send({ hello: "helo farmer data recieved" });
    }
    //  else if (role == "admin") {
    //   const newAdmin = new Admin({
    //     name: name,
    //     email: email,
    //     password: password,
    //   });
    //   await newAdmin.save();
    //   res.send({ hello: "hai admin data recieved" });
    // }
    else {
      console.log("error occured");
    }
  },
  postLogin: async (req, res) => {
    const { email, password, role } = req.body;
    try {
      if (role == "user") {
        const existingUser = await User.findOne({ email: email });
        if (!existingUser) {
          return res.status(400).json({ message: "User not found" });
        }
        if (existingUser.password !== password) {
          return res.status(400).send({ message: "Invalid password" });
        }
        res.status(200).json({ message: "Login successful" });
      }
      
      else if (role == "farmer") {
        const existingFarmer = await Farmer.findOne({ email: email });
        if (!existingFarmer) {
          return res.status(400).json({ message: "Farmer not found" });
        }
        if (existingFarmer.password !== password) {
          return res.status(400).send({ message: "Invalid password" });
        }
        res.status(200).json({ message: "Login successful" });
      }

      else if (role == "admin") {
        const existingAdmin = await Admin.findOne({ email: email });
        if (!existingAdmin) {
          return res.status(400).json({ message: "Admin not found" });
        }
        if (existingAdmin.password !== password) {
          return res.status(400).send({ message: "Invalid password" });
        }
        res.status(200).json({ message: "Login successful" });
      }else{
        console.log('login error');
      }
    } catch (error) {
      console.error("Error during login:", error);
      res.status(500).json({ message: "Internal server error" });
    }
  },
};
module.exports = object;
