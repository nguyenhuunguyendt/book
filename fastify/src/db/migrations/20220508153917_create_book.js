/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
exports.up = function (knex) {
    return knex.schema.createTable('books', (table) => {
        table.increments('id');
        table.string('name').notNullable()
        table.string('author').notNullable()
        table.integer('year').notNullable();
        table.integer('quantity').notNullable();
        table.string('type').notNullable();
        table.string('image').notNullable();
    });
};


/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
exports.down = function (knex) {
    return knex.schema.dropTable('books');
};
