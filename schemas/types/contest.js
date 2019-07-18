const {
  GraphQLObjectType,
  GraphQLID,
  GraphQLString,
  GraphQLNonNull,
  GraphQLEnumType
} = require('graphql');

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
    createdAt: { type: new GraphQLNonNull(GraphQLString) }
  }
});
