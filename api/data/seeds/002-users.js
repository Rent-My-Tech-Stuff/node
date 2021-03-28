
exports.seed = function(knex) {
  return knex('users').insert([
    {username: 'test1', firstname: 'testing', lastname: 'tests', email: 'test1@testing.com', password: 'test123', streetAddress: '1548 Test St.', city: 'Dallas', state: 'Texas', zipcode: '74802', role: 'owner'},
    {username: 'Steph', firstname: 'Steph', lastname: 'Anie', email: 'me@me.com', password: 'test123', streetAddress: '12345 Abc St.', city: 'Owasso', state: 'Oklahoma', zipcode: '74055', role: 'renter'},
    {username: 'testing1', firstname: 'test1', lastname: 'test1', email: 'testing1@test1.com', password: 'test12345', streetAddress: '15896 Weird Ave.', city: 'Los Angeles', state: 'California', zipcode: '89456', role: 'owner'}
  ]);
};
