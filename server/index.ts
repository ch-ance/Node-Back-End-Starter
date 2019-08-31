import express = require("express");
import helmet = require("helmet");
import morgan = require("morgan");
import cors = require("cors");
const authRouter = require("../routers/authRouter");

const server: express.Application = express();

server.use(helmet());
server.use(express.json());
server.use(cors());
server.use(morgan("combined"));

// SANITY CHECK
server.get("/", (_req, res) => {
  res.send("Server is up and running");
});

server.use("/api/auth", authRouter);

const port: number = 5000;

server.listen(port, function() {
  console.log(`\n*** Listening on port ${port} ***\n`);
});
