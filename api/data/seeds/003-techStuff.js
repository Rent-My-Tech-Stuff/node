exports.seed = function(knex) {
  return knex('items').insert([
    {name: 'Canon Camera', category: 'camera', price_per_day: '40', rental_period: '4', description: 'new, lots pixles', user_id: 1},
    {name: 'Hitachi TV', category: 'TV', price_per_day: '60', rental_period: '3', description: 'plasma, 65inch', user_id: 3},
    {name: 'Speakers', category: 'party equipment', price_per_day: '65', rental_period: '6', description: 'great sound, loud, easy to setup', user_id: 3}
  ]);
};
