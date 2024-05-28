// Update with your config settings.
/**
 * @type { Object.<string, import("knex").Knex.Config> }
 */

module.exports = {
  development: {
    client: 'pg',
    connection: {
      database: 'objection',
      user:     'postgres',
      password: '123',
    },
    pool: {
      min: 2,
      max: 10
    },


    migrations: {
      tableName: 'knex_migrations'
    },
    seeds:{
      directory:'./seeds',
    },
 
  },
  



};
