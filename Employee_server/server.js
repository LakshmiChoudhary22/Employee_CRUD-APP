const mongoose = require("mongoose");
const express = require("express");
const employee = require("./routes/employeeRoute");
const cors = require("cors");

const PORT = 5000;
const app = express();
app.use(cors());

app.use(express.json());

mongoose.connect(
  "mongodb+srv://lakshmichoudhary74:12345@freecluster.g9apx2s.mongodb.net/?retryWrites=true&w=majority"
);

const database = mongoose.connection;

database.on("error", (error) => {
  console.log("Database connection error");
  console.log(error);
});

database.once("connected", () => {
  console.log("connected to database");
});

app.listen(PORT, () => {
  console.log(`Lakshmi's Server has started at port ${PORT}`);
});

app.get("/", (req, res) => {
  console.log("server working");
  // return res.json({ message: "Server Working" });
  return res.status(200).json({ message: "server working" });
});
app.use("/employee", employee);
