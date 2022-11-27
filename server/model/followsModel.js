const pool = require('../database');

module.exports = {
  selectData: async ({ user_followed_id }) => {
    try {
      const followsData = await pool.query('SELECT * FROM users WHERE id IN (SELECT user_following_id FROM follows WHERE user_followed_id = $1)', [user_followed_id])
      return followsData.rows;
    } catch (err) {
      console.log(err)
      throw err
    }
  }
}

