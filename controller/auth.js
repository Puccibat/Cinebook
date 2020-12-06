const User = require('../model/User');
const bcrypt = require('bcryptjs');
const { signupValidation } = require('../validation');

signup = async (req, res) => {
  //Validate user before saving
  const { error } = signupValidation(req.body);
  if (error) return res.status(400).send(error.details[0].message);

  //Check if the user is already in the database
  const checkedEmail = await User.findOne({ email: req.body.email });
  if (checkedEmail)
    return res.status(400).send('Email already exists, please go to signin');

  //Hash password
  const salt = await bcrypt.genSalt(10);
  const hashedPassword = await bcrypt.hash(req.body.password, salt);

  //Create a new user
  const user = new User({
    name: req.body.name,
    email: req.body.email,
    password: hashedPassword,
  });
  try {
    const savedUser = await user.save();
    res.send(savedUser);
  } catch (error) {
    res.status(400).send(error);
  }
};

module.exports = { signup };
