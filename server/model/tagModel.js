const pool = require('../database')

module.exports= {
  getAllTags: async ()=> {
    try {
      const tags = await pool.query('SELECT tag from tags')
        return tags.rows;
    } catch (err) {
      console.log(err);
      return err
    }
  }
}