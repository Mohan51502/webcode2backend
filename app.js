const express = require("express");
const app_server = express();
const bodyparser = require("body-parser");
const signup_controller = require("./Controllers/Signup");
const signin_controller = require("./Controllers/Login");
const { checkJWTValidaty } = require("./Middleware/Authmiddleware");
const Product_controller = require("./Controllers/Products");








app_server.use(bodyparser.json());
app_server.use(bodyparser.urlencoded({ extended: true }));


app_server.use("/api/v1/signup", signup_controller);
app_server.use("/api/v1/login", signin_controller);
app_server.use("/api/v1/product", Product_controller);





module.exports = app_server;