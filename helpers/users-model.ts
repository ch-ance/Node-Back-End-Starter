import knex = require("knex");
import { returnedUser, User } from "../interfaceDeclarations";
const db: knex = require("../database/dbConfig");

module.exports = {
  findById,
  findByUsername,
  add
};

async function findById(id: number): Promise<returnedUser> {
  const user: returnedUser = await db("users")
    .select("*")
    .where({ id })
    .first();

  return user;
}

async function add(user: User): Promise<returnedUser> {
  return await db("users")
    .insert(user)
    .returning("*");
}

async function findByUsername(username: string): Promise<returnedUser> {
  const user: returnedUser = await db("users")
    .select("*")
    .where({ username })
    .first();

  return user;
}
