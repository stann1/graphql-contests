const {
  GraphQLSchema,
  GraphQLString,
  GraphQLObjectType,
  GraphQLNonNull
} = require('graphql');
const MeType = require('./types/me');
const pgDb = require('../database/pgDb');

const RootQueryType = new GraphQLObjectType({
  name: "RootQueryType",
  fields: {
    me: {
      type: MeType,
      description: "Current user identified by api key",
      args: {
        key: {type: GraphQLNonNull(GraphQLString)}
      },
      resolve: (obj, args, {postgres}) => {
        return pgDb(postgres).getUser(args.key);
      }
    },
  }
})

const schema = new GraphQLSchema({
  query: RootQueryType
});

module.exports = schema;
