const User = require("../models/userSchema");
const Farmer = require("../models/farmerSchema");
const Admin = require("../models/adminSchema");
const jwt = require("jsonwebtoken");

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
        const payload = { _id: newUser._id, email: newUser.email, role: role };
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
        const payload = { _id: newUser._id, email: newUser.email, role: role };
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
};
module.exports = object;
