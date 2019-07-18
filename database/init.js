const { nodeEnv } = require('../config/app');
const dbDebug = require('debug')('app:db');

const initMongo = () => {
  const { MongoClient, Logger } = require('mongodb');
  const mongoConfig = require('../config/mongo')[nodeEnv];

  return new Promise((resolve, reject) => {
    MongoClient.connect(mongoConfig.url, { useNewUrlParser: true }, (err, client) => {
      if (err) {
        reject(err);
      }

      Logger.setLevel('info');
      
      resolve(client);
    });
  })
}

const initPg = async () => {
  const PgPool = require('pg').Pool;
  const pgConfig = require('../config/pg')[nodeEnv];

  const pool = new PgPool(pgConfig);
  pool.on('acquire', () => {
    dbDebug("Acquired new client from pg pool");
  });
  pool.on('remove', () => {
    dbDebug("Removed new client from pg pool");
  });
  return pool;
}

const init = async () => {
  const db = {
    postgres: null,
    mongo: null
  }
  
  const postgreClient = await initPg();
  db.postgres = postgreClient;
  dbDebug("Postgres client connected.");

  const mongoClient = await initMongo();
  dbDebug("Mongo client connected.");
  db.mongo = mongoClient.db();

  return db;
}

module.exports = {
  init
};
