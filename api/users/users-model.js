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
    return db('items as i').join('users as u', 'i.user_id', 'u.user_id')
        .select('i.item_id as item_id', 'i.name as name', 'i.category as category',
         'i.price_per_day as price_per_day', 'i.rental_period as rental_period',
         'i.description as description', 'u.username as username', 'u.email as email', 
         'u.firstname as firstname', 'u.lastname as lastname', 'u.streetAddress as streetAddress', 
         'u.city as city', 'u.state as state', 'u.zipcode as zipcode', 'i.user_id as user_id')
        .where('i.name', 'like', filter)
        .orWhere('i.category', 'like', filter)
        .andWhere('u.city', 'like', location)
        .orWhere('u.state', 'like', location)
        .orWhere('u.zipcode', 'like', location)
}