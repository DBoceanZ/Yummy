const validateUser = require("../model/validateUser");

module.exports = {
  postNewUser: async (req, res) => {
    const newUser = req.body;
    try {
      const user = await validateUser.addUser(newUser);
      res.status(201).send(user);
    } catch (err) {
      console.log(err);
    }
  },
  getUser: async (req, res) => {
    const { auth_key } = req.params;
    const user = await validateUser.getUserData(auth_key);
    console.log(user);
    res.status(200).send(user);
  },
  testRoute: async (req, res) => {
    try {
      const data = await validateUser.testDatabase();
      res.status(200).send(data);
    } catch (err) {
      console.log(err);
    }
  },
};
