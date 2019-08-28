"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var express = require("express");
var server = express();
var port = 5000;
server.listen(port, function () {
    console.log("\n*** Listening on port " + port + " ***\n");
});
