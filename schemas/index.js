const {
  GraphQLSchema,
  GraphQLString,
  GraphQLObjectType,
  GraphQLNonNull
} = require('graphql');
const UserType = require('./types/user');
const pgDb = require('../database/pgDb');

const RootQueryType = new GraphQLObjectType({
  name: "RootQueryType",
  fields: {
    me: {
      type: UserType,
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
