const videosModel = require('../model/videosModel');

module.exports = {
  homeVideos: async (req, res) => {
    try {
      const videos = await videosModel.homeVideos(req.query);
      res.status(200).json(videos)
    } catch (err) {
      console.log(err);
      res.sendStatus(500)
    }
  }
}