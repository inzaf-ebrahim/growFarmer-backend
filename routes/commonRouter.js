const express = require("express");
const router = express.Router();

const { postSignup, postLogin } = require("../controller/commonController");

router.post("/signup", postSignup);
router.post("/login", postLogin);

module.exports = router;
