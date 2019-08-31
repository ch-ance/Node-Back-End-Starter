"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const db = require("../database/dbConfig");
module.exports = {
    findById,
    findByUsername,
    add
};
async function findById(id) {
    const user = await db("users")
        .select("*")
        .where({ id })
        .first();
    return user;
}
async function add(user) {
    const newUser = await db("users")
        .insert(user)
        .returning("username");
    return newUser;
}
async function findByUsername(username) {
    const user = await db("users")
        .select("*")
        .where({ username })
        .first();
    return user;
}
