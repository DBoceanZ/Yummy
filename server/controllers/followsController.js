const followsModel = require('../model/followsModel')

module.exports = {
  getData: async (req, res) => {
    try {
      const followsData = await followsModel.selectData(req.query);
      res.status(200).json(followsData)
    } catch (err) {
      console.log(err)
      res.sendStatus(500);
    }
  }
}