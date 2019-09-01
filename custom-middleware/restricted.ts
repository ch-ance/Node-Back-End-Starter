require("dotenv").config();
import express = require("express");

import jwt = require("jsonwebtoken");
const secret = process.env.JWT_SECRET || "secret";

interface request extends express.Request {
  jwtToken: string | object;
}

function restricted(req: request, res: express.Response, next: Function): void {
  const token: string | undefined = req.headers.authorization;

  if (token) {
    jwt.verify(token, secret, (err, decodedToken) => {
      if (err) {
        res.status(401).json({ message: "Unauthorized" });
      } else {
        req.jwtToken = decodedToken;
        next();
      }
    });
  } else {
    res.status(401).json({ message: "Unauthorized" });
  }
}
