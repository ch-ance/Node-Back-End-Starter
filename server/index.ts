import express = require("express");

const server: express.Application = express();

const port: number = 5000;

server.listen(port, function() {
  console.log(`\n*** Listening on port ${port} ***\n`);
});
