const {
  GraphQLObjectType,
  GraphQLID,
  GraphQLString,
  GraphQLNonNull
} = require('graphql');

const pgDb = require('../../database/pgDb');

module.exports = new GraphQLObjectType({
  name: "Name",
  fields: () => {
    const User = require('./user');

    return {
      id: { type: GraphQLID },
      label: { type: new GraphQLNonNull(GraphQLString) },
      description: { type: GraphQLString },
      createdAt: { type: new GraphQLNonNull(GraphQLString) },
      createdBy: {
        type: new GraphQLNonNull(User),
        resolve(obj, args, { postgres }) {
          return pgDb(postgres).getUserById(obj.createdBy);
        }
      }
    }
  }
});
