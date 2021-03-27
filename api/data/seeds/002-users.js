
exports.seed = function(knex) {
  return knex('users').insert([
    {username: 'test', firstname: 'testing', lastname: 'tests', email: 'test@testing.com', password: 'test123', role: 'owner'},
    {username: 'Steph', firstname: 'Steph', lastname: 'Anie', email: 'me@me.com', password: 'test123', role: 'renter'},
    {username: 'testing', firstname: 'test', lastname: 'test', email: 'testing@test.com', password: 'test123', role: 'owner'}
  ]);
};
