const User = require('../model/User');

const getUserById = async (userId) => {
  return await User.findById(userId);
};

//const updateProfil = (req, res) => {};

module.exports = { getUserById };
