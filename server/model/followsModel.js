const pool = require('../database');

module.exports = {
  selectFollowers: async ({ user_followed_id }) => {
    try {
      const followers = await pool.query('SELECT * FROM users WHERE id IN (SELECT user_following_id FROM follows WHERE user_followed_id = $1)', [user_followed_id])
      return followers.rows;
    } catch (err) {
      console.log(err)
      throw err
    }
  },
  selectFollowing: async ({ user_following_id }) => {
    try {
      const following = await pool.query('SELECT * FROM users WHERE id IN (SELECT user_followed_id FROM follows WHERE user_following_id = $1)', [user_following_id])
      return following.rows;
    } catch (err) {
      console.log(err)
      throw err
    }
  }
}

