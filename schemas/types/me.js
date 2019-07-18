const {
  GraphQLObjectType,
  GraphQLID,
  GraphQLString,
  GraphQLNonNull,
  GraphQLList,
  GraphQLInt
} = require('graphql');

const ContestType = require('./contest');
const pgDb = require('../../database/pgDb');
const mongoDb = require('../../database/mongoDb');

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
    },
    contestsCount: {
      type: GraphQLInt,
      resolve(obj, args, {mongo}, {fieldName}){
        return mongoDb(mongo).getCounts(obj, fieldName)
      }
    },
    namesCount: {
      type: GraphQLInt,
      resolve(obj, args, {mongo}, {fieldName}){
        return mongoDb(mongo).getCounts(obj, fieldName)
      }
    },
    votesCount: {
      type: GraphQLInt,
      resolve(obj, args, {mongo}, {fieldName}){
        return mongoDb(mongo).getCounts(obj, fieldName)
      }
    }
  }
});
