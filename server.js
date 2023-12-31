const express = require("express");
const app = express();
const mongoose = require("mongoose");
const memberController = require("./routers/memberController");
const blogController = require("./routers/blogController");
const { generateDummyData } = require("./faker");
const hostname = "127.0.0.1";
const port = 3000;
const DB_URI = "mongodb://127.0.0.1:27017/testdb";

const server = async () => {
  try {
    await mongoose.connect(DB_URI);
    // generateDummyData(5, 10, 10);
    app.use(express.json());
    app.use(memberController);
    app.use("/blog", blogController);
    console.log("blogController : \n" + blogController);
    app.listen(port, hostname, () => {
      console.log("server is running");
    });
  } catch (error) {
    console.log(error);
  }
};
server();
