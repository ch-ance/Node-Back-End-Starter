import express = require("express");
import bcrypt = require("bcryptjs");
import jwt = require("jsonwebtoken");
import { Credentials, returnedUser, User } from "../interfaceDeclarations";
const Users = require("../helpers/users-model");

const secret = process.env.JWT_SECRET || "secret";

const router = express.Router();

// Register Endpoint

router.post("/register", async (req, res) => {
  try {
    const user: User = req.body.user;

    const hash: string = hashPassword(user.password);

    const hashedUser: User = { ...user, password: hash };

    const newUser: returnedUser = await Users.add(hashedUser);

    res.status(201).json({
      message: `Successfully registered user ${newUser.username}`
    });
  } catch (error) {
    res.status(500).json({ error, message: "Error adding user" });
  }
});

// Login Endpoint

router.post("/login", async (req, res) => {
  try {
    const loginInfo: Credentials = req.body.user;
    const user: returnedUser = await Users.findByUsername(loginInfo.username);
    if (isValidHash(loginInfo.password, user.password)) {
      const token = generateToken(user);
      res.status(200).json({
        message: `Access granted for ${user.username}`,
        token
      });
    } else {
      throw new Error();
    }
  } catch (error) {
    res.status(401).json({ message: "Unauthorized" });
  }
});

function hashPassword(pass: string): string {
  return bcrypt.hashSync(pass, 10);
}

function isValidHash(givenPass: string, realPass: string): boolean {
  return bcrypt.compareSync(givenPass, realPass);
}

function generateToken(user: returnedUser): string {
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
