const pool = require('../database');

module.exports = {
  homeVideos: async ({ user_id }) => {
    try {
      const videos = await pool.query('SELECT id, video_url, created_at, creator_id, (SELECT username FROM users where id = creator_id) as created_by, (SELECT count(comments.id) FROM comments where video_id = videos.id) as comment_count, (SELECT count(likes.id) FROM likes WHERE video_id = videos.id) as likes FROM videos where videos.id IN (SELECT video_id FROM video_tags WHERE tag_id IN (SELECT tag_id FROM user_interests WHERE user_id = $1))', [user_id])
      return videos.rows;
    } catch (err) {
      return err;
    }
  }
}