import knex = require("knex");
import bcrypt = require("bcryptjs");

const password = bcrypt.hash("password", 10);

exports.seed = function(knex: knex) {
  // Deletes ALL existing entries
  return knex("users")
    .del()
    .then(function() {
      // Inserts seed entries
      return knex("users").insert([{ id: 1, username: "user1", password }]);
    });
};
