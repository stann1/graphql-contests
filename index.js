const { nodeEnv } = require('./config/app');
const debug = require('debug')("app:startup");

debug(`Running in ${nodeEnv} mode...`);
const schema = require('./schemas/index');
const express = require('express');
const graphqlHTTP = require('express-graphql');

require('./database/init').init().then(db => {
  const app = express();

  app.use('/graphql',
    graphqlHTTP({
      schema: schema,
      graphiql: true,
      context: db
    }),
  );

  const port = process.env.PORT || 5000;

  app.listen(port, () => {
    debug("Server listening on port " + port);
  });
}).catch(err => {
  debug(err);
});