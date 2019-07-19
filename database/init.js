const { nodeEnv } = require('../config/app');
const dbDebug = require('debug')('app:db');
const queryDebug = require('debug')('app:pgquery');

const initMongo = () => {
  const { MongoClient, Logger } = require('mongodb');
  const mongoConfig = require('../config/mongo')[nodeEnv];

  return new Promise((resolve, reject) => {
    MongoClient.connect(mongoConfig.url, { useNewUrlParser: true }, (err, client) => {
      if (err) {
        reject(err);
      }

      Logger.setLevel('debug');
      Logger.filter('class', ["Db"]);
      
      resolve(client.db());
    });
  })
}

const initPg = async () => {
  const PgPool = require('pg').Pool;
  const pgConfig = require('../config/pg')[nodeEnv];

  const pool = new PgPool(pgConfig);
  
  pool.on('error', (err) => {
    dbDebug("Error in the pool: " + err);
  });
  pool.on('connect', client => {
    const original = client.query;

    client.query = (...args) => {
      queryDebug(`QUERY: ${args[0]}, ${args[1]}`);
      return original.apply(client, args);
    }
  })
  return pool;
}

const init = async () => {
  const db = {
    postgres: null,
    mongo: null
  }
  
  const postgrePool = await initPg();
  db.postgres = postgrePool;
  dbDebug("Postgres client connected.");

  const mongoPool = await initMongo();
  dbDebug("Mongo client connected.");
  db.mongo = mongoPool;

  return db;
}

module.exports = {
  init
};
