const videosModel = require('../model/videosModel');

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
  allVideos: async (req, res) => {
    try {
      const videos = await videosModel.allVideos(req.query);
      res.status(200).json(videos);
    } catch (err) {
      console.log(err);
      res.sendStatus(500);
    }
  },
  addVideo: async (req, res) => {
    try {
      const addVideo = await videosModel.addVideo(req.body);
      if (addVideo.rowCount) {
        res.sendStatus(201);
      } else {
        res.sendStatus(400);
      }
    } catch (err) {
      console.log(err);
      res.sendStatus(500);
    }
  },
  search: async (req, res) => {
    try {
      const videos = await videosModel.searchByTag(req.path.slice(1));
      res.status(200).json(videos);
    } catch (err) {
      console.log(err);
      res.sendStatus(500);
    }
  },
};
