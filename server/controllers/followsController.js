const followsModel = require('../model/followsModel')

module.exports = {
  getFollowers: async (req, res) => {
    try {
      const followers = await followsModel.selectFollowers(req.query);
      res.status(200).json(followers)
    } catch (err) {
      console.log(err)
      res.sendStatus(500);
    }
  },
  getFollowing: async (req, res) => {
    try {
      const following = await followsModel.selectFollowing(req.query);
      res.status(200).json(following)
    } catch (err) {
      console.log(err)
      res.sendStatus(500);
    }
  }
}