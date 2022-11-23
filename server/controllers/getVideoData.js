const selectVideoData = require('../model/selectVideoData');

module.exports = {
  videoComments: async (req, res) => {
    const allComments = await selectVideoData.selectComments(req.query.video_id)
    res.status(200).json(allComments)
  }
}