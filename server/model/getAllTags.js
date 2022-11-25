const pool = require('../database')

module.exports= {
  getAllTags: async ()=> {
    try {
      const tags = await pool.query('SELECT DISTINCT tag from tags')
        //TODO confirm it is getting proper data form db if nto mutate data to fit needs
        return tags;
    } catch (err) {
      console.log(err);
      return err
    }
  }
}