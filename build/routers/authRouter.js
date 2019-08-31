"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express = require("express");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const secret = process.env.JWT_SECRET || "secret";
const router = express.Router();
// Register Endpoint
router.post("/register", async (req, res) => {
    const user = req.body;
    const hash = hashPassword(user.password);
    const hashedUser = { ...user, password: hash };
    //   await Users.add
});
function hashPassword(pass) {
    return bcrypt.hashSync(pass, 10);
}
function isValidHash(givenPass, realPass) {
    return bcrypt.compareSync(givenPass, realPass);
}
function generateToken(user) {
    const payload = {
        subject: user.id,
        username: user.username
    };
    const options = {
        expiresIn: "1d"
    };
    return jwt.sign(payload, secret, options);
}
