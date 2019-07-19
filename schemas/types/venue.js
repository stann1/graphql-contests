const {
  GraphQLObjectType,
  GraphQLID,
  GraphQLString,
  GraphQLNonNull
} = require('graphql');

const pgDb = require('../../database/pgDb');

module.exports = new GraphQLObjectType({
  name: "Venue",
  fields: () => {
    const User = require('./user');
    return {
      id: { type: GraphQLID },
      name: { type: new GraphQLNonNull(GraphQLString) },
      moderator: {
        type: new GraphQLNonNull(User),
        resolve(obj, args, { postgres }) {
          return pgDb(postgres).getUserById(obj.modifiedBy);
        }
      },
      modifiedOn: { type: new GraphQLNonNull(GraphQLString) }
    }
  }
});
