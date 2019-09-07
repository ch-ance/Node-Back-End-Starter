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

async function add(user: User): Promise<userPasswordHidden | undefined> {
  console.log("Attemping to add: ", user);
  try {
    const newUser: returnedUser = await db("users")
      .insert(user)
      .returning("*");
    console.log("Should have added the user: ", newUser);
    return {
      ...newUser,
      password: undefined
    };
  } catch (error) {
    console.log("THERE WAS AN ERROR ADDING!!!", error);
    return undefined;
  }
}

function findByUsername(username: string): Promise<userPasswordHidden> {
  return db("users")
    .select("*")
    .where({ username })
    .first();
}
