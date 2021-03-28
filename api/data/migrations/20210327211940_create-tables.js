exports.up = async (knex) => {
  await knex.schema
    .createTable('users', tbl => {
        tbl.increments('user_id')
        tbl.string('username', 128).notNullable().unique()
        tbl.string('password', 128).notNullable()
        tbl.string('email', 256).notNullable().unique()
        tbl.string('firstname', 128).notNullable()
        tbl.string('lastname', 128).notNullable()
        tbl.string('streetAddress', 128).notNullable()
        tbl.string('city', 128).notNullable()
        tbl.string('state', 128).notNullable()
        tbl.string('zipcode', 5).notNullable()
        tbl.string('role').notNullable()
    })
    .createTable('items', tbl => {
        tbl.increments('item_id')
        tbl.string('name', 128).notNullable()
        tbl.string('category', 128).notNullable()
        tbl.string('price_per_day').notNullable()
        tbl.string('rental_period').notNullable()
        tbl.string('description', 300).notNullable()
        tbl.integer('user_id')
            .notNullable()
            .unsigned()
            .references('user_id')
            .inTable('users')
            .onUpdate('CASCADE')
            .onDelete('CASCADE')
    })
};

exports.down = async (knex) => {
  await knex.schema
    .dropTableIfExists('items')
    .dropTableIfExists('users')
};
