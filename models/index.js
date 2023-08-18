const User = require('./user');
const Thoughts = require('./thoughts');

module.exports = {User, Thoughts}

// /api/users
// -get FIndAll()
// -post Create()

// /api/users/:id
// -update()
// -delete()
// -findONe()

// /api/users/:id/friends
// -Add a freind to the user we find by id (post or put)

// /api/users/:id/friends/:friendID
// - Delete a freind to the user we find by id, we'll remove the freindID