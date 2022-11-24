const userModel = require('../model/userModel')

module.exports = {
  getData: async (req, res) => {
    try {
      const userData = await userModel.selectData(req.query);
      res.status(200).json(userData)
    } catch (err) {
      console.log(err)
      res.sendStatus(500);
    }
  }
}