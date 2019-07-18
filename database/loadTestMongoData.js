const { MongoClient } = require('mongodb');
const assert = require('assert');
const { nodeEnv } = require('../lib/util');
const mongoConfig = require('../config/mongo')[nodeEnv];

MongoClient.connect(mongoConfig.url, {useNewUrlParser:true}, (err, client) => {
  assert.equal(null, err);

  const db = client.db();
  db.collection('users').insertMany([
    {
      userId: 1,
      contestsCount: 3,
      namesCount: 0,
      votesCount: 4
    },
    {
      userId: 2,
      contestsCount: 0,
      namesCount: 4,
      votesCount: 4
    }
  ]).then(response => {
    console.log(response);
    client.close();
  });
});
