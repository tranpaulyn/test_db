exports.up = function(knex, Promise) {  
    return Promise.all([
      knex.schema.createTable('create_milestones', function(table){
        table.increments();
        table.string('description');
        table.date('date_achieved');
        // table.foreign('famous_person_id').refrences('famous_people.id');
        table.timestamps();
      })
    ])
  };
  
  exports.down = function(knex, Promise) {  
    return Promise.all([
      knex.schema.dropTable('create_milestones')
    ])
  };