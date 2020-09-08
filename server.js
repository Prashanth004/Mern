const express = require("express");
const bodyParser = require("body-parser");
const userRoute = require("./routes/userRoute");
const adminRoute = require("./routes/adminRoute");
const postRoute = require("./routes/postRoute");
const passport = require("passport");
var cors = require("cors");
var path = require("path");
const mongoose = require("mongoose");
const config = require("config");

mongoose.connect("mongodb://localhost/myappdatabase");

var db = mongoose.connection;
db.on("error", console.error.bind(console, "MongoDB connection error:"));

class Server {
  constructor() {
    this.port = config.get("PORT");
    this.app = express();
  }

  config() {
    require("./controllers/auth");
    this.app.use(passport.initialize());
    this.app.use(passport.session());
    this.app.use(bodyParser.json());
    this.app.use(cors());
    this.app.use(
      bodyParser.urlencoded({
        extended: false,
      })
    );
    this.app.use("/uploads", express.static(__dirname + "/uploads"));
    this.app.use("/api/user", userRoute);
    this.app.use("/api/admin", adminRoute);
    this.app.use("/api/post", postRoute);
    this.app.use(express.static("client/build"));

    this.app.get("*", function (request, response) {
      const filePath = path.resolve(__dirname, "client", "build", "index.html");
      response.sendFile(filePath);
    });
  }

  start() {
    this.config();
    this.app.listen(this.port, () => {
      console.log(
        "Starting dashboard server..\n listening on port ",
        this.port
      );
    });
  }
}

const app = new Server();
app.start();
