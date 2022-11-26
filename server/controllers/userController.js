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
  },
  postFollow: async (req, res) => {
    try {
      await userModel.addFollow(req.body);
      res.sendStatus(201);
    } catch (err) {
      if (err.code = '23505') {
        res.sendStatus(400);
      } else {
        res.sendStatus(500);
      }
    }
  },
  deleteFollow: async (req, res) => {
    try {
      await userModel.removeFollow(req.body);
      res.sendStatus(200);
    } catch (err) {
      console.log(err);
    }
  },
  updateUser: async (req, res) => {
    try {
      await userModel.updateUser(req.body);
      res.sendStatus(200);
    } catch (err) {
      console.log(err)
      res.sendStatus(500)
    }
  }
}