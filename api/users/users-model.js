const db = require('../data/db-config')

module.exports = {
    addUser,
    findUserBy,
    findById,
    searchItem,
    findAllItems
}

async function addUser(user) {
    const [id] = await db('users').insert(user, 'user_id')
    return findById(id)
}

function findById(id) {
    return db('users')
        .where('user_id', id)
        .select('user_id', 'username', 'firstname', 
        'lastname', 'email', 'role')
        .first()
}

function findUserBy(filter) {
    return db('users').where(filter)
}

function findAllItems() {
    return db('items')
}

function searchItem(filter, location) {
    return db('items as i')
        .join('users as u')
        .select('i.item_id as item_id', 'i.name as name', 'i.category as category',
         'i.price_per_day as price_per_day', 'i.rental_period as rental_period',
         'i.description as description', 'u.username as ownerUsername', 'u.email as ownerEmail', 
         'u.firstname as ownerFirstname', 'u.lastname as ownerLastname', 'u.streetAddress as streetAddress', 
         'u.city as city', 'u.state as state', 'u.zipcode as zipcode', 'i.user_id as user_id')
        .where('name', 'like', filter)
        .orWhere('category', 'like', filter)
        .andWhere('city', 'like', location)
        .orWhere('state', 'like', location)
        .orWhere('zipcode', 'like', location)
}