const pool = require('../database');

module.exports = {
  addComment: async ({ video_id, commenter_id, comment }) => {
    try {
      const addComment = await pool.query('INSERT INTO comments(video_id, commenter_id, comment) VALUES ($1, $2, $3)', [video_id, commenter_id, comment]);
      console.log('model');
      console.log(addComment);
      return addComment;
    } catch (err) {
      console.log(err)
      return err
    }
  },
  addLike: async ({ video_id, user_id}) => {
    try {
      const addLike = await pool.query('INSERT INTO likes(user_id, video_id) VALUES ($1, $2)', [user_id, video_id])
      return(addLike)
    } catch (err) {
      console.log("ERROR 1")
      return 'error'
    }
  },
  selectComments: async (videoId) => {
    try {
      const comments = await pool.query('SELECT array_agg(row_to_json(video_comments)) FROM (SELECT comment, created_at, (SELECT username FROM users WHERE id = commenter_id) FROM comments WHERE video_id = $1 ORDER BY created_at DESC) as video_comments;', [videoId])
      return comments.rows[0].array_agg;
    } catch (err) {
      console.log(err);
      return err
    }
  }
}