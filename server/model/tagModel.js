const pool = require('../database')

module.exports= {
  getAllTags: async ()=> {
    try {
      const tags = await pool.query('SELECT tag from tags')
        return tags.rows;
    } catch (err) {
      console.log(err);
      return err
    }
  },
  getVideos: async (tag) => {
    try{
      const videos = await pool.query('Select video_url from tags inner join video_tags on tags.id = video_tags.tag_id inner join videos on video_tags.video_id = videos.id')
      return videos.rows;
    } catch (err) {
      console.log(err);
      return err
    }
  }
}