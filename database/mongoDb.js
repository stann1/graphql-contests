module.exports = mongoPool => {
  return {
    getCounts(user, countsField){
      return mongoPool.collection('users')
      .findOne({userId: user.id})
      .then(userCounts => userCounts[countsField])
    }
  }
};
