const express = require("express");
const app = require("./app");

const node_server = express();
require('dotenv').config();
const cors = require("cors");



require("./dbconfig");
node_server.use(cors());


node_server.use("/", app);
const port = process.env.PORT || 5000;


node_server.listen(port, () => {
});