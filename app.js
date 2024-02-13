const express = require("express");
const app = express();
const port = 4000;
const bodyparser = require("body-parser");

const commonRouter =require('./routes/commonRouter')
const cors = require("cors");
require("dotenv").config();
const mongoose = require("./config/config");
app.use(cors());
app.use(bodyparser.urlencoded({ extended: true }));
app.use(bodyparser.json());
// app.post("/", (req, res) => {
//   console.log(req.body);
//   res.status(200).json({ hello: "inzaf" });
// });

app.use('/',commonRouter)

app.listen(port, () => {
  console.log(`Server is listening at http://localhost:${port}`);
});
