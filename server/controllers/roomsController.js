const Room = require('../models/Rooms');

const createRoom = async (req, res) => {
  try {
    const newRoom = new Room(req.body);
    // await newRoom.save();
    console.log(newRoom);
    res.status(200).json('Created room');
  } catch (error) {
    res.status(500).json('Failed to create room', error);
  }
};

module.exports = { createRoom }