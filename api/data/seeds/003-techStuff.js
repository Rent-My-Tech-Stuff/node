exports.seed = function(knex) {
  return knex('items').insert([
    {name: 'Canon Camera', category: 'camera', price_per_day: '40', rental_period: 4, description: '', user_id: 1},
    {name: 'Hitachi TV', category: 'TV', price_per_day: '60', rental_period: 3, description: '', user_id: 3},
    {name: 'Speakers', category: 'party equipment', price_per_day: '65', rental_period: 6, description: '', user_id: 3}
  ]);
};
