/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
exports.up = function (knex) {
  return knex.schema.createTable("stores", (table) => {
    table.increments("id");
    table.integer("userId").notNullable();
    table.integer("bookId").notNullable();
    table.integer("dateBorrow").notNullable();
    table.integer("dateGive");
    table.string("status").notNullable().defaultTo("S1");
  });
};

/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
exports.down = function (knex) {
  return knex.schema.dropTable("stores");
};
