"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var express = require("express");
var helmet = require("helmet");
var morgan = require("morgan");
var cors = require("cors");
var server = express();
server.use(helmet());
server.use(express.json());
server.use(cors());
server.use(morgan("combined"));
// SANITY CHECK
server.get("/", function (_req, res) {
    res.send("Server is up and running");
});
var port = 5000;
server.listen(port, function () {
    console.log("\n*** Listening on port " + port + " ***\n");
});
