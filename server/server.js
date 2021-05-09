const express = require("express");
const mongoose = require("mongoose");
const morgan = require("morgan");
const cors = require("cors");

const { auth } = require("firebase-admin");
const fs = require("fs");
require("dotenv").config();

//app
const app = express();

//database
mongoose
  .connect(process.env.MONGO_URI, {
    useNewUrlParser: true,
    useCreateIndex: true,
    useFindAndModify: true,
  })
  .then(() => {
    console.log("DB Connected");
  })
  .catch((err) => console.log(`DB CONNECTION ERROR ${err.message}`));
app.use(morgan("dev"));
app.use(express.json({ limit: "2mb" }));
app.use(cors());

//route middleware
fs.readdirSync("./routes/").map((r) => {
  app.use("/api", require("./routes/" + r));
});

const port = process.env.PORT || 8000;

app.listen(port, () => {
  console.log("app is running on port ", port);
});
