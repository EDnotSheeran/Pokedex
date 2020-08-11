import * as knex from 'knex'

export async function up(knex:knex) {
    return knex.schema.createTable('pokemon', table => {
        table.increments('id').primary()
        table.string('name').notNullable()
        table.string('type').notNullable()
        table.integer('number').notNullable()
        table.string('description').notNullable()
    })
} 

export async function down(knex:knex) {
    return knex.schema.dropTableIfExists('users')
} 