const {
  GraphQLObjectType,
  GraphQLID,
  GraphQLString,
  GraphQLNonNull
} = require('graphql');

const pgDb = require('../../database/pgDb');

module.exports = new GraphQLObjectType({
  name: "NameType",
  fields: () => {
    const UserType = require('./user');

    return {
      id: { type: GraphQLID },
      label: { type: new GraphQLNonNull(GraphQLString) },
      description: { type: GraphQLString },
      createdAt: { type: new GraphQLNonNull(GraphQLString) },
      createdBy: {
        type: new GraphQLNonNull(UserType),
        resolve(obj, args, { postgres }) {
          return pgDb(postgres).getUserById(obj.createdBy);
        }
      }
    }
  }
});
