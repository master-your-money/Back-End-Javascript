
exports.up = function(knex) {
  return knex.schema.createTable('profiles', function(profiles){
      profiles.increments();

      profiles
        .integer('user_id')
        .unsigned()
        .notNullable()
        .references('id')
        .inTable('users')
        .onDelete('CASCADE')
        .onUpdate('CASCADE');

    profiles.string('firstname', 128).notNullable();
    profiles.string('lastname', 128).notNullable();
    profiles.string('location', 128).notNullable();
    profiles.string('website', 128).notNullable();
    profiles.string('bio').notNullable();
  })
};

exports.down = function(knex) {
  return knex.schema.dropTableIfExists('profiles');
};
