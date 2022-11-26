const videosModel = require("../model/videosModel");

module.exports = {
  homeVideos: async (req, res) => {
    try {
      const videos = await videosModel.homeVideos(req.query);
      res.status(200).json(videos);
    } catch (err) {
      console.log(err);
      res.sendStatus(500);
    }
  },
  addVideo: async (req, res) => {
    console.log(req);
    try {
      const addVideo = await videosModel.addVideo(req.query);
      if (addVideo.rowcount) {
        res.sendStatus(201);
      } else {
        res.sendStatus(400);
      }
    } catch (err) {
      console.log(err);
      res.sendStatus(500);
    }
  },
};
