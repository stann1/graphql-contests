const {
  GraphQLObjectType,
  GraphQLID,
  GraphQLString,
  GraphQLNonNull,
  GraphQLEnumType,
  GraphQLList
} = require('graphql');

const Name = require('./name');
const Venue = require('./venue');
const pgDb = require('../../database/pgDb');

const ContestStatus = new GraphQLEnumType({
  name: "ContestStatus",
  values: {
    DRAFT: { value: 'draft' },
    PUBLISHED: { value: 'published' },
    ARCHIVED: { value: 'archived' },
  }
})

module.exports = new GraphQLObjectType({
  name: "Contest",
  fields: {
    id: {type: GraphQLID},
    code: { type: new GraphQLNonNull(GraphQLString)},
    title: { type: new GraphQLNonNull(GraphQLString) },
    description: { type: GraphQLString },
    status: { type: new GraphQLNonNull(ContestStatus) },
    createdAt: { type: new GraphQLNonNull(GraphQLString) },
    names: {
      type: new GraphQLList(Name),
      resolve(obj, args, {postgres}){
        return pgDb(postgres).getNames(obj);
      }
    },
    venue: {
      type: Venue,
      resolve(obj, args, {postgres}){
        return pgDb(postgres).getVenueById(obj.venueId)
      }
    }
  }
});
