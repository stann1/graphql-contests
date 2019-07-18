const humps = require('humps');

module.exports = pgPool => {
  return {
    getUser(apiKey){
      return pgPool.query(`select * from users where api_key = $1`, [apiKey]).then((result) => {
        return humps.camelizeKeys(result.rows[0]);
      });
    },
    getContests(user){
      return pgPool.query(`select * from contests where created_by = $1`, [user.id]).then((result) => {
        return humps.camelizeKeys(result.rows);
      });
    },
    getNames(contest){
      return pgPool.query(`select * from names where contest_id = $1`, [contest.id]).then((result) => {
        return humps.camelizeKeys(result.rows);
      });
    },
    getUserById(id){
      return pgPool.query(`select * from users where id = $1`, [id]).then((result) => {
        return humps.camelizeKeys(result.rows[0]);
      });
    }
  }
};
