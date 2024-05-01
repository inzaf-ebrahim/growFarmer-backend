const express = require("express");
const app = express();
const port = 4000;
const bodyparser = require("body-parser");

const commonRouter = require("./routes/commonRouter");
const farmerRouter = require("./routes/farmerRouter");
const userRouter = require('./routes/userRouter')

const cors = require("cors");
require("dotenv").config();
const mongoose = require("./config/config");
app.use(cors());
app.use(bodyparser.urlencoded({ extended: true }));
app.use(bodyparser.json());

app.use("/", commonRouter);
app.use("/farmer", farmerRouter);
app.use('/user',userRouter)

app.listen(port, () => {
  console.log(`Server is listening at http://localhost:${port}`);
});
