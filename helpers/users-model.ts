import knex = require("knex");
import { returnedUser, Credentials } from "../interfaceDeclarations";
const db: knex = require("../database/dbConfig");

async function findById(id: number): Promise<returnedUser> {
  const user: returnedUser = await db("users")
    .select("*")
    .where({ id })
    .first();

  return user;
}

async function add(user: Credentials): Promise<returnedUser> {
  return await db("users")
    .insert(user)
    .returning("*");
}
