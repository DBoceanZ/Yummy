const insertVideoData = require('../model/insertVideoData');

module.exports = {
  comment: async (req, res) => {
    try {
      const pass = await insertVideoData.comment(req.body);
      if (pass) {
        res.sendStatus(201);
      } else {
        res.sendStatus(400)
      }
    } catch (err) {
      console.log(err)
      res.sendStatus(500)
    }
  }

}

