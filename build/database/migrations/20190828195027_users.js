"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.up = function (knex) {
    return knex.schema.createTable("users", function (users) {
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
exports.down = function (knex) {
    return knex.schema.dropTableIfExists("users");
};
