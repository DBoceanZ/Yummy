const pool = require('../database')

module.exports= {
  selectComments: async (videoId) => {
    try {
      const comments = await pool.query('SELECT array_agg(row_to_json(video_comments)) FROM (SELECT comment, created_at, (SELECT username FROM users WHERE id = commenter_id) FROM comments WHERE video_id = $1) as video_comments;', [videoId])
      return comments.rows[0].array_agg;
    } catch (err) {
      console.log(err);
      return err
    }
  }
}