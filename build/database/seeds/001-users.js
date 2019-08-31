"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.seed = function (knex) {
    // Deletes ALL existing entries
    return knex("users")
        .del()
        .then(function () {
        // Inserts seed entries
        return knex("table_name").insert([
            { id: 1, username: "user1", password: "password" }
        ]);
    });
};
