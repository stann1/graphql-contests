const {
  GraphQLSchema,
  GraphQLString,
  GraphQLObjectType,
  GraphQLNonNull
} = require('graphql');
const User = require('./types/user');
const pgDb = require('../database/pgDb');

const RootQueryType = new GraphQLObjectType({
  name: "RootQueryType",
  fields: {
    me: {
      type: User,
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
