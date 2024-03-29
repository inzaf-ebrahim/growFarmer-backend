const express = require("express");
const router = express.Router();

const { Signup, postLogin } = require("../controller/commonController");

router.post("/signup", Signup);
router.post("/login", postLogin);

module.exports = router;
