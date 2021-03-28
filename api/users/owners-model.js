const db = require('../data/db-config')

module.exports = {
    getItemByItemId,
    getItemsByOwnerId,
    addItem,
    editItem,
    removeItem
}

function getItemByItemId(itemId) {
    return db('items')
        .where('item_id', itemId)
        .first()
}

function getItemsByOwnerId(ownerId) {
    return db('items').where('user_id', ownerId)
}

async function addItem(item) {
    const [id] = await db('items').insert(item, 'item_id')
    return getItemByItemId(id)
}

async function editItem(itemId, changes) {
    const [id] = await db('items').where('item_id', itemId).update(changes, 'item_id')
    return getItemByItemId
}

function removeItem(id) {
    return db('items').where('item_id', id).del()
}