const User = require("../models/Users");
const multer = require("multer");
const storage = multer.memoryStorage();
const upload = multer({ storage: storage });
const { uploadBlob } = require("../services/azureStorageBlob");

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

const updateAvatar = async (req, res) => {
  const fileBuffer = req.file.buffer;
  const userId = req.body.userId;

  try {
    const avatarUrl = await uploadBlob("avatars", userId, fileBuffer);
    const updatedUser = await User.findByIdAndUpdate(userId, {
      avatarUrl: avatarUrl,
    });

    res.status(200).json(updatedUser.avatarUrl);
  } catch (error) {
    res.status(500).json("Failed to upload avatar", error);
  }
};

const sendFriendRequest = async (req, res) => {
  const { senderId, recipientId } = req.body;
  try {
    const sender = await User.findById(senderId);
    const recipient = await User.findById(recipientId);

    if (!sender || !recipient) {
      return res.status(404).send("User not found");
    }

    // Kiểm tra xem yêu cầu đã được gửi trước đó hay chưa
    if (recipient.sentFriendRequests.includes(sender)) {
      return res.status(400).send("Friend request already sent");
    }

    // Thêm recipient vào danh sách sentFriendRequests của sender
    recipient.sentFriendRequests.push(sender);
    await recipient.save();

    res.status(200).send("Friend request sent");
  } catch (error) {
    res.status(500).send(error.message);
  }
};

const acceptFriendRequest = async (req, res) => {
  const { userId, friendId } = req.body;

  try {
    const user = await User.findById(userId);
    const friend = await User.findById(friendId);

    if (!user || !friend) {
      return res.status(404).send("User not found");
    }

    if (!friend.sentFriendRequests.includes(userId)) {
      return res.status(400).send("Friend request not found");
    }

    user.friends.push(friendId);
    friend.friends.push(userId);

    friend.sentFriendRequests = friend.sentFriendRequests.filter(
      (id) => id.toString() !== userId.toString()
    );

    await user.save();
    await friend.save();

    res.status(200).send("Friend request accepted");
  } catch (error) {
    res.status(500).send(error.message);
  }
};

module.exports = {
  upload,
  createUser,
  getAllUsers,
  getUserById,
  updateUser,
  updateAvatar,
  sendFriendRequest,
  acceptFriendRequest,
};
