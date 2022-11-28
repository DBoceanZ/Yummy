const pool = require('../database');

module.exports = {
  homeVideos: async ({ user_id }) => {
    try {
      const videos = await pool.query(
        'SELECT id, video_url, created_at, creator_id, (SELECT username FROM users where id = creator_id) as created_by, summary, (SELECT count(comments.id) FROM comments where video_id = videos.id) as comment_count, (SELECT count(likes.id) FROM likes WHERE video_id = videos.id) as likes FROM videos where videos.id IN (SELECT video_id FROM video_tags WHERE tag_id IN (SELECT tag_id FROM user_interests WHERE user_id = $1))',
        [user_id]
      );
      return videos.rows;
    } catch (err) {
      throw err;
    }
  },
  allVidoes: async () => {
    try {
      const videos = await pool.query('SELECT * FROM videos');
      return videos.rows;
    } catch (err) {
      throw err;
    }
  },
  addVideo: async ({ video_url, user_id, summary }) => {
    try {
      const addVideo = await pool.query(
        'INSERT INTO videos(video_url, creator_id, summary) VALUES ($1, $2, $3)',
        [video_url, user_id, summary]
      );
      return addVideo;
    } catch (err) {
      return err;
    }
  },
  searchByTag: async (tag) => {
    try {
      const videos = await pool.query(
        'SELECT id, video_url, created_at, creator_id, (SELECT username FROM users where id = creator_id) as created_by, summary, (SELECT count(comments.id) FROM comments where video_id = videos.id) as comment_count, (SELECT count(likes.id) FROM likes WHERE video_id = videos.id) as likes FROM videos WHERE videos.id in (SELECT video_id FROM video_tags WHERE tag_id = (SELECT id FROM tags WHERE tag = $1));',
        [tag]
      );
      return videos.rows;
    } catch (err) {
      throw err;
    }
  },
};
