const {
  GraphQLObjectType,
  GraphQLID,
  GraphQLString,
  GraphQLNonNull,
  GraphQLList
} = require('graphql');

const ContestType = require('./contest');
const pgDb = require('../../database/pgDb');

module.exports = new GraphQLObjectType({
  name: "MeType",
  fields: {
    id: {type: GraphQLID},
    email: { type: GraphQLNonNull(GraphQLString)},
    firstName: { type: GraphQLString },
    lastName: { type: GraphQLString },
    createdAt: { type: GraphQLString },
    contests: {
      type: new GraphQLList(ContestType),
      resolve(obj, args, {postgres}){
        return pgDb(postgres).getContests(obj);
      } 
    }
  }
});
