const express = require("express");
const router = express.Router();

const { Signup, Login } = require("../controller/commonController");
const verifyToken = require("../middleware/verifyToken");

router.post("/signup", Signup);
router.post("/login", Login);

module.exports = router;
