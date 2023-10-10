const {Pool} = require('pg');

const PG_URI = 'postgres://mrbnctqa:NuAsy2AxlRUAL96P1uhZGvqgd5sI5p1j@bubble.db.elephantsql.com/mrbnctqa'

const pool = new Pool({connectionString: PG_URI});

module.exports = {
    query: (text, params, callback) => {
      console.log('executed query', text);
      return pool.query(text, params, callback);
    }
}