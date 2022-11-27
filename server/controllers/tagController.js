const tagModel = require('../model/tagModel')

module.exports = {
  getTags: async (req, res) => {
    try {
      const tags = await tagModel.getAllTags();
      res.status(200).json(tags)
    } catch (err) {
      console.log(err)
      res.sendStatus(500);
    }
  },
  getVideosByTag: async (req, res) => {
    const {tag} = req.params;
    try {
      const vids = await tagModel.getVideos(tag);
      res.status(200).json(vids);
    } catch (err) {
      console.log(err)
      res.sendStatus(500);
    }
  }
}