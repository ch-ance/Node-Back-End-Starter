"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express = require("express");
const Users = require("../helpers/users-model");
const restricted = require("../custom-middleware/restricted");
const router = express.Router();
// Get User endpoints : restricted
// get by user id
router.get("/id/:id", restricted, (req, res) => {
    const { id } = req.params;
    try {
        const user = Users.findById(id);
        res.status(202).json(user);
    }
    catch (error) {
        res.status(400).json({ message: "User not found" });
    }
});
// get by username
router.get("/username/:username", restricted, (req, res) => {
    const { username } = req.params;
    try {
        const user = Users.findByUsername(username);
        res.status(202).json(user);
    }
    catch (error) {
        res.status(400).json({ message: "User not found" });
    }
});
module.exports = router;
