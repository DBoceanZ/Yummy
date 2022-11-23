const pool = require('../database');

module.exports = {
  comment: async ({ video_id, commenter_id, comment }) => {
    try {
      const addComment = await pool.query('INSERT INTO comments(video_id, commenter_id, comment) VALUES ($1, $2, $3)', [video_id, commenter_id, comment])
      return addComment.rowCount === 1
    } catch (err) {
      console.log(err)
      return err
    }

  }
}