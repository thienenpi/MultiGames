const Message = require("../models/Message");

const getAllMessages = async (req, res) => {
  try {
    const messages = await Message.find();
    res.status(200).json(messages);
  } catch (err) {
    res.status(500).json(err);
  }
};

const getMessages = async (req, res) => {
  try {
    const { userId, friendId } = req.params;
    const messages = await Message.find({
      $or: [
        { sender: userId, recipient: friendId },
        { sender: friendId, recipient: userId },
      ],
    }).sort({ timestamp: 1 });

    res.json(messages);
  } catch (err) {
    res.status(500).send(err);
  }
};

const sendMessage = async (req, res) => {
  try {
    const newMessage = new Message(req.body);
    const savedMessage = await newMessage.save();
    res.status(201).json(savedMessage);
  } catch (err) {
    res.status(500).send(err);
  }
};

const deleteAllMessages = async (req, res) => {
  try {
    await Message.deleteMany();
    res.status(200).json("All messages have been deleted.");
  } catch (err) {
    res.status(500).json(err);
  }
};

module.exports = {
  getAllMessages,
  getMessages,
  sendMessage,
  deleteAllMessages,
};
