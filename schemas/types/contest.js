const {
  GraphQLObjectType,
  GraphQLID,
  GraphQLString,
  GraphQLNonNull,
  GraphQLEnumType,
  GraphQLList
} = require('graphql');

const NameType = require('./name');
const pgDb = require('../../database/pgDb');

const ContestStatusType = new GraphQLEnumType({
  name: "ContestStatusType",
  values: {
    DRAFT: { value: 'draft' },
    PUBLISHED: { value: 'published' },
    ARCHIVED: { value: 'archived' },
  }
})

module.exports = new GraphQLObjectType({
  name: "ContestType",
  fields: {
    id: {type: GraphQLID},
    code: { type: new GraphQLNonNull(GraphQLString)},
    title: { type: new GraphQLNonNull(GraphQLString) },
    description: { type: GraphQLString },
    status: { type: new GraphQLNonNull(ContestStatusType) },
    createdAt: { type: new GraphQLNonNull(GraphQLString) },
    names: {
      type: new GraphQLList(NameType),
      resolve(obj, args, {postgres}){
        return pgDb(postgres).getNames(obj);
      }
    }
  }
});
