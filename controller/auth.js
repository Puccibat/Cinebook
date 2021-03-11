const User = require('../model/User');
const { getUserById } = require('../controller/user');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const { signupValidation, signinValidation } = require('./validation');

//Register a new user
const signup = async (req, res) => {
  //Validate user before saving
  try {
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
      email: req.body.email,
      userName: req.body.userName,
      password: hashedPassword,
    });
    console.log('after create user', user);
    const savedUser = await user.save();
    savedUser.password;
    res.status(201).json(savedUser);
  } catch (error) {
    console.error(error);
    res.status(500).json('There is an error, please try again');
  }
};

//Login a user
const signin = async (req, res) => {
  //Validate user before login
  const { error } = signinValidation(req.body);
  if (error) return res.status(400).send(error.details[0].message);

  //Checking if the email exists
  const user = await User.findOne({ email: req.body.email }).select(
    '+password'
  );
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
  const { _id, userName, email, role } = user;
  return res.json({ token, user: { _id, email, userName, role } });
};

//SignOut
const signout = (req, res) => {
  res.clearCookie('t');
  res.json({ message: 'Sign Out successed' });
};

//Verify if the user is authenticated
const isAuth = (req, res, next) => {
  if (
    req.headers.authorization &&
    req.headers.authorization.startsWith('Bearer')
  ) {
    try {
      const userToken = req.headers.authorization.split(' ')[1];

      if (!userToken) return res.status(401).send('Access Denied');

      try {
        const verified = jwt.verify(userToken, process.env.SECRET_TOKEN);
        req.user = verified;
        next();
      } catch (error) {
        res.status(400).send('Invalid Token');
      }
    } catch (error) {
      console.error(error);
      res.status(401);
      throw new Error('Not authorized, token failed');
    }
  }
};

//Admin connection
const isAdmin = async (req, res, next) => {
  try {
    const user = await getUserById(req.user._id);

    if (user.role === 0) {
      return res.status(403).json({
        error: 'You are not allowed to go there !',
      });
    }
    next();
  } catch (e) {
    res.status(500).json('There is an error, please try again');
  }
};

module.exports = { signup, signin, isAuth, isAdmin, signout };
