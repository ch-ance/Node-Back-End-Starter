import express = require("express");
import bcrypt = require("bcryptjs");
import jwt = require("jsonwebtoken");
import { Credentials, returnedUser } from "../interfaceDeclarations";

const secret = process.env.JWT_SECRET || "secret";

const router = express.Router();

// interface definitions

// interface Credentials {
//   username: string;
//   password: string;
//   email?: string;
//   firstName?: string;
//   lastName?: string;
// }

// interface returnedUser extends Credentials {
//   id: number;
// }

// Register Endpoint

router.post("/register", async (req, res) => {
  const user: Credentials = req.body;

  const hash: string = hashPassword(user.password);

  const hashedUser = { ...user, password: hash };

  //   await Users.add
});

function hashPassword(pass: string) {
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
