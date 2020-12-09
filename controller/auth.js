const User = require('../model/User');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const { signupValidation, signinValidation } = require('../validation');

//Register a new user
const signup = async (req, res) => {
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

//Login a user
const signin = async (req, res) => {
  //Validate user before login
  const { error } = signinValidation(req.body);
  if (error) return res.status(400).send(error.details[0].message);

  //Checking if the email exists
  const user = await User.findOne({ email: req.body.email });
  if (!user)
    return res
      .status(400)
      .send(
        'Email or password is wrong, if you are not registered, please go to signup'
      );

  //Checking if the password is correct
  const validPass = await bcrypt.compare(req.body.password, user.password);
  if (!validPass)
    return res
      .status(400)
      .send(
        'Email or password is wrong, if you are not registered, please go to signup'
      );

  //Create and assign a token
  const token = jwt.sign({ _id: user._id }, process.env.SECRET_TOKEN);
  //res.header('auth-token', token).send(token);
  res.cookie('t', token, { expire: new Date() + 9999 });
  const { _id, name, email, role } = user;
  return res.json({ token, user: { _id, email, name, role } });
};

//SignOut
const signout = (req, res) => {
  res.clearCookie('t');
  res.json({ message: 'Sign Out successed' });
};

//Verify if the user is authenticated
const isAuth = (req, res, next) => {
  const userToken = req.header('auth-token');
  if (!userToken) return res.status(401).send('Access Denied');

  try {
    const verified = jwt.verify(userToken, process.env.SECRET_TOKEN);
    req.user = verified;
    next();
  } catch (error) {
    res.status(400).send('Invalid Token');
  }
};

//Admin connection
const isAdmin = (req, res, next) => {
  if (req.body.role === 0) {
    return res.status(403).json({
      error: 'You are not allowed to go there !',
    });
  }
  next();
};

module.exports = { signup, signin, isAuth, isAdmin, signout };
