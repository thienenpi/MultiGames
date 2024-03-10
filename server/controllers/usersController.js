const User = require('../models/Users');

const createUser = async (req, res) => {
  try {
    const newUser = new User(req.body);
    await newUser.save();
    res.status(200).json('Created user');
  } catch (error) {
    res.status(500).json('Failed to create user', error);
  }
};

const getAllUsers = async (req, res) => {
  try {
    const users = await User.find().sort({ name: 'desc' });
    res.status(200).json(users);
  } catch (error) {
    console.error('Failed to get all users: ', error);
  }
};

module.exports = {
  createUser,
  getAllUsers
};
