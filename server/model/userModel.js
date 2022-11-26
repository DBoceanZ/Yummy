const pool = require('../database');

module.exports = {
  selectData: async ({ user_id }) => {
    try {
      const userData = await pool.query('SELECT username, bio, profile_photo_url, (SELECT array_agg(row_to_json(video_data)) as videos from (SELECT id, video_url, created_at, creator_id, (SELECT username FROM users where id = $1) as created_by, (SELECT count(comments.id) FROM comments where video_id = videos.id) as comment_count, (SELECT count(likes.id) FROM likes WHERE video_id = videos.id) as likes FROM videos WHERE creator_id = $1) as video_data) FROM users WHERE id = $1;', [user_id])
      return userData.rows[0];
    } catch (err) {
      console.log(err)
      throw err
    }
  },
  addFollow: async ({ user_id, followed_id }) => {
    try {
      await pool.query('INSERT INTO follows(user_following_id, user_followed_id) VALUES ($1, $2)', [user_id, followed_id]);
    } catch (err) {
      throw(err);
    }
  },
  removeFollow: async ({ user_id, followed_id }) => {
    try {
      await pool.query('DELETE FROM follows WHERE user_following_id = $1 AND user_followed_id = $2;', [user_id, followed_id]);
    } catch (err) {
      throw(err);
    }
  },
  updateUser: async ({ user_id, bio, profile_photo_url }) => {
    try {
      if (profile_photo_url && bio) {
        await pool.query('UPDATE users SET bio = $2, profile_photo_url = $3 WHERE id = $1;', [user_id, bio, profile_photo_url]);
      } else if (profile_photo_url) {
        await pool.query('UPDATE users SET profile_photo_url = $2 WHERE id = $1;', [user_id, profile_photo_url]);
      } else if (bio) {
        await pool.query('UPDATE users SET bio = $2 WHERE id = $1;', [user_id, bio]);
      }
    } catch (err) {
      throw(err)
    }
  }
}

