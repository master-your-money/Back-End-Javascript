
exports.up = function(knex) {
  return knex.schema.createTable('budget', function(budget){
      budget.increments();

      budget
        .integer('profile_id')
        .unsigned()
        .notNullable()
        .references('id')
        .inTable('profiles')
        .onDelete('CASCADE')
        .onUpdate('CASCADE');

       budget.integer('Income');
       budget.integer('Expenditure');
       budget.string('Region').notNullable();
  });
};

exports.down = function(knex) {
  
};
