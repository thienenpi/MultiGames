const User = require('../models/Users');
const CryptoJS = require('crypto-js');
const dotenv = require('dotenv');

dotenv.config();

const login = async (req, res) => {
  try {
    const user = await User.findOne({ email: req.body.email });

    if (!user) {
      return res.status(401).json('Email not found');
    }

    const decryptedPassword = CryptoJS.AES.decrypt(user.password, process.env.SECRET)
    const password = decryptedPassword.toString(CryptoJS.enc.Utf8)

    if (password !== req.body.password) {
        return res.status(401).json('Wrong password')
    }

    res.status(200).json('Welcome')

  } catch (error) {
    res.status(500).json(error)
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
    res.status(500).json(error)
  }
};

module.exports = {
  login,
  register,
};
