const mongoose = require("mongoose");
const mongoURL = process.env.MONGO_URL;

module.exports = mongoose
  .connect(mongoURL)
  .then(() => {
    console.log("MongoDB connected");
  })
  .catch((error) => {
    console.error("MongoDB connection error:", error);
  });
