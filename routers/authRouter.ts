import express = require("express");
import bcrypt = require("bcryptjs");
import jwt = require("jsonwebtoken");
import {
  Credentials,
  returnedUser,
  User,
  userPasswordHidden
} from "../interfaceDeclarations";
const Users = require("../helpers/users-model");

const secret = process.env.JWT_SECRET || "secret";

const router = express.Router();

// Register Endpoint

router.post("/register", (req, res) => {
  const user: User = req.body.user;

  const hash: string = hashPassword(user.password);

  const hashedUser: User = { ...user, password: hash };

  console.log("hashed the user", hashedUser);

  const newUser: userPasswordHidden = Users.add(hashedUser);

  if (newUser) {
    res.status(201).json(newUser);
  }

  res.status(500).json({ message: "Error adding user" });
});

// Login Endpoint

router.post("/login", (req, res) => {
  const loginInfo: Credentials = req.body.user;

  function callback(user: returnedUser) {
    if (user && bcrypt.compareSync(loginInfo.password, user.password)) {
      const token = generateToken(user);
      res.status(200).json({
        message: `Welcome ${user.username}`,
        token
      });
    } else {
      res.status(401).json({ message: "Unauthorized" });
    }
  }

  Users.findByUsername(loginInfo.username)
    .then(callback)
    .catch(() => {
      res.status(500).json({ message: "Something went wrong" });
    });
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
