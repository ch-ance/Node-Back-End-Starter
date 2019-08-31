import knex = require("knex");

exports.up = function(knex: knex) {
  return knex.schema.createTable("users", users => {
    users.increments();

    users
      .string("username", 32)
      .unique()
      .notNullable();

    users.string("password", 255).notNullable();

    // Optional fields

    users.string("email", 64).unique();

    users.string("first_name", 32);

    users.string("last_name", 32);
  });
};

exports.down = function(knex: knex) {
  return knex.schema.dropTableIfExists("users");
};
