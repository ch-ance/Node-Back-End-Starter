"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
require("dotenv").config();
const jwt = require("jsonwebtoken");
const secret = process.env.JWT_SECRET || "secret";
function restricted(req, res, next) {
    const token = req.headers.authorization;
    if (token) {
        jwt.verify(token, secret, (err, decodedToken) => {
            if (err) {
                res.status(401).json({ message: "Unauthorized" });
            }
            else {
                req.jwtToken = decodedToken;
                next();
            }
        });
    }
    else {
        res.status(401).json({ message: "Unauthorized" });
    }
}
