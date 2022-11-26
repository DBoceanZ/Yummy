const tagModel = require('../model/tagModel')

module.exports = {
  getTags: async (req, res) => {
    try {
      const tagData = await tagModel.getAllTags();
      res.status(200).json(userData)
    } catch (err) {
      console.log(err)
      res.sendStatus(500);
    }
  }
}
