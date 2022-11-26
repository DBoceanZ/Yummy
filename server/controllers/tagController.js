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
  }
}