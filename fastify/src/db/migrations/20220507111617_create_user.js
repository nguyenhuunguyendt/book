/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
exports.up = function (knex) {
  return knex.schema.createTable("users", (table) => {
    table.increments("id");
    table.string("email").notNullable().unique();
    table.string("password").notNullable();
    table.boolean("isActive").notNullable().defaultTo("false");
    table.boolean("isAdmin").notNullable().defaultTo("false");
    table.integer("wrongPassword").notNullable().defaultTo(0);
    table.integer("timeAgain");
    table.string("tokenForgotPass");
    table.timestamps(true, true);
  });
};

/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
exports.down = function (knex) {
  return knex.schema.dropTable("users");
};
