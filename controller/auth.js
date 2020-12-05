const User = require('../model/User');

exports.signup = async (req, res) => {
  console.log(req.body);
  const user = new User(req.body);
  try {
    const savedUser = await user.save();
    res.send(savedUser);
  } catch (error) {
    res.status(400).send(error);
  }
};
