const pool = require("../database");

const queries = {
  testQuery: `SELECT * FROM users`,
  getOneUser: `SELECT id, username, email, profile_photo_url FROM users WHERE auth_key= $1`,
  addOneUser: `INSERT INTO users (username, email, auth_key) VALUES ($1, $2, $3)`,
};

module.exports = {
  addUser: async ({ username, email, auth_key }) => {
    try {
      const addNewUser = await pool.query(queries.addOneUser, [
        username,
        email,
        auth_key,
      ]);
      return addNewUser.rowCount === 1;
    } catch (err) {
      console.log(err);
    }
  },
  getUserData: async (key) => {
    console.log("key", key);
    try {
      const { rows: response } = await pool.query(queries.getOneUser, [key]);
      return response;
    } catch (err) {
      console.log(err);
    }
  },
  testDatabase: async () => {
    try {
      const { rows: response } = await pool.query(queries.testQuery);
      return response;
    } catch (err) {
      console.log(err);
    }
  },
};
