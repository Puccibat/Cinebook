const User = require('../model/User');
const { signupValidation } = require('../validation');

signup = async (req, res) => {
  //Validate user before saving
  const { error } = signupValidation(req.body);
  if (error) return res.status(400).send(error.details[0].message);

  const user = new User(req.body);
  try {
    const savedUser = await user.save();
    res.send(savedUser);
  } catch (error) {
    res.status(400).send(error);
  }
};

module.exports = { signup };
