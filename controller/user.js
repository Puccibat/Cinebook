const User = require('../model/User');

const getUserById = async (userId) => {
  try {
    return await User.findById(userId);
  } catch (error) {
    console.error(error);
  }
};

//const updateProfil = (req, res) => {};

module.exports = { getUserById };
