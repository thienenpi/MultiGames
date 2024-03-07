const User = require('../models/Users');
const CryptoJS = require('crypto-js');
const dotenv = require('dotenv');
const jwt = require('jsonwebtoken');

dotenv.config();

const login = async (req, res) => {
  try {
    const user = await User.findOne({ email: req.body.email });

    if (!user) {
      return res.status(401).json('Email not found');
    }

    const decryptedPassword = CryptoJS.AES.decrypt(
      user.password,
      process.env.SECRET
    );
    const pass = decryptedPassword.toString(CryptoJS.enc.Utf8);

    if (pass !== req.body.password) {
      return res.status(401).json('Wrong password');
    }

    const userToken = jwt.sign({ id: user.id }, process.env.JWT_SEC, {
      expiresIn: '7d',
    });

    const { password, __v, createdAt, updatedAt, ...userData } = user._doc;

    res.status(200).json({ ...userData, token: userToken });
  } catch (error) {
    res.status(500).json(error);
  }
};

const register = async (req, res) => {
  try {
    const newUser = new User(req.body);
    const password = newUser.password;
    const encryptedPassword = CryptoJS.AES.encrypt(
      password,
      process.env.SECRET
    ).toString();

    newUser.password = encryptedPassword;
    await newUser.save();
    res.status(200).json('Register successfully');
  } catch (error) {
    console.error('Failed to register: ', error);
    res.status(500).json(error);
  }
};

module.exports = {
  login,
  register,
};
