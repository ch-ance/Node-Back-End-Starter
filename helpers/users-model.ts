import knex = require("knex");

import {
  returnedUser,
  User,
  userPasswordHidden
} from "../interfaceDeclarations";
const db: knex = require("../database/dbConfig");

module.exports = {
  findById,
  findByUsername,
  add
};

async function findById(id: number): Promise<userPasswordHidden> {
  const user: returnedUser = await db("users")
    .select("*")
    .where({ id })
    .first();

  return {
    ...user,
    password: undefined
  };
}

async function add(user: User): Promise<userPasswordHidden> {
  const newUser: returnedUser = await db("users")
    .insert(user)
    .returning("username");
  return {
    ...newUser,
    password: undefined
  };
}

async function findByUsername(username: string): Promise<userPasswordHidden> {
  const user: returnedUser = await db("users")
    .select("*")
    .where({ username })
    .first();

  return {
    ...user,
    password: undefined
  };
}
