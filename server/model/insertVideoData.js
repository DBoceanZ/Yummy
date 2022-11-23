const pool = require('../database');

module.exports = {
  comment: async ({ video_id, commenter_id, comment }) => {
    try {
      const addComment = await pool.query('INSERT INTO comments(video_id, commenter_id, comment) VALUES ($1, $2, $3)', [video_id, commenter_id, comment])
      return addComment.rowCount === 1;
    } catch (err) {
      console.log(err)
      return err
    }
  },
  like: async ({ video_id, user_id}) => {
    try {
      const addLike = await pool.query('INSERT INTO likes(user_id, video_id) VALUES ($1, $2)', [video_id, user_id])
      console.log(addLike);
    } catch (err) {
      console.log(err)
      return err
    }
  }
}