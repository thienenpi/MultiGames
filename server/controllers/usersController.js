const User = require("../models/Users");

const createUser = async (req, res) => {
  try {
    const newUser = new User(req.body);
    await newUser.save();
    res.status(200).json("Created user");
  } catch (error) {
    res.status(500).json("Failed to create user", error);
  }
};

const getAllUsers = async (req, res) => {
  try {
    const users = await User.find().sort({ name: "desc" });
    res.status(200).json(users);
  } catch (error) {
    console.error("Failed to get all users: ", error);
  }
};

const getUserById = async (req, res) => {
  try {
    const user = await User.findById(req.params.id);

    // if not found, return 404
    if (!user) {
      return res.status(404).json("User not found");
    }

    res.status(200).json(user);
  } catch (error) {
    console.error("Failed to get user by id: ", error);
  }
};

const updateUser = async (req, res) => {
  try {
    // check if user exists
    const user = await User.findById(req.params.id);

    if (!user) {
      return res.status(404).json("User not found");
    }

    // update user
    await User.updateOne(
      { _id: req.params.id },
      {
        $set: req.body,
      }
    );

    res.status(200).json("User updated");
  } catch (error) {
    console.error("Failed to update user: ", error);
  }
};

module.exports = {
  createUser,
  getAllUsers,
  getUserById,
  updateUser,
};
