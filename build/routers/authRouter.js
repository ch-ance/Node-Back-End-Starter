"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express = require("express");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const Users = require("../helpers/users-model");
const secret = process.env.JWT_SECRET || "secret";
const router = express.Router();
// Register Endpoint
router.post("/register", async (req, res) => {
    try {
        const user = req.body.user;
        const hash = hashPassword(user.password);
        const hashedUser = { ...user, password: hash };
        const newUser = await Users.add(hashedUser);
        res.status(201).json({
            message: `Successfully registered user ${newUser.username}`
        });
    }
    catch (error) {
        res.status(500).json({ error, message: "Error adding user" });
    }
});
// Login Endpoint
router.post("/login", async (req, res) => {
    try {
        const loginInfo = req.body.user;
        const user = await Users.findByUsername(loginInfo.username);
        if (isValidHash(loginInfo.password, user.password)) {
            const token = generateToken(user);
            res.status(200).json({
                message: `Access granted for ${user.username}`,
                token
            });
        }
        else {
            throw new Error();
        }
    }
    catch (error) {
        res.status(401).json({ message: "Unauthorized" });
    }
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
module.exports = router;
