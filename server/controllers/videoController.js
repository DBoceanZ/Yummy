const videoModel = require('../model/videoModel');

module.exports = {
  addComment: async (req, res) => {
    try {
      const pass = await videoModel.addComment(req.body);
      if (pass.rowCount) {
        res.sendStatus(201);
      } else {
        res.sendStatus(400);
      }
    } catch (err) {
      console.log(err);
      res.sendStatus(500);
    }
  },
  addLike: async (req, res) => {
    try {
      const pass = await videoModel.addLike(req.body);
      console.log(pass);
      if (pass.rowCount) {
        res.sendStatus(201);
      } else {
        res.sendStatus(400);
      }
    } catch (err) {
      console.log('ERROR!');
      res.sendStatus(500);
    }
  },
  getComments: async (req, res) => {
    const allComments = await videoModel.selectComments(req.query.video_id);
    res.status(200).json(allComments);
  },
};
