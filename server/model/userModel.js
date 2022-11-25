const pool = require('../database');

module.exports = {
  selectData: async ({ user_id }) => {
    try {
      const userData = await pool.query('SELECT username, bio, profile_photo_url, (SELECT array_agg(row_to_json(video_data)) as videos from (SELECT id, video_url, created_at, creator_id, (SELECT username FROM users where id = $1) as created_by, (SELECT count(comments.id) FROM comments where video_id = videos.id) as comment_count, (SELECT count(likes.id) FROM likes WHERE video_id = videos.id) as likes FROM videos WHERE creator_id = $1) as video_data) FROM users WHERE id = $1;', [user_id])
      return userData.rows[0];
    } catch (err) {
      console.log(err)
      return err
    }
  }
}

