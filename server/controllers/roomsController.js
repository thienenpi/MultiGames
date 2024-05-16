const Room = require("../models/Rooms");

const createRoom = async (req, res) => {
  try {
    const newRoom = new Room(req.body);
    console.log(newRoom);
    await newRoom.save();
    res.status(200).json("Created room");
  } catch (error) {
    res
      .status(500)
      .json({ message: "Failed to create room", error: error.message });
  }
};

const getAllRooms = async (req, res) => {
  try {
    const rooms = await Room.find();
    res.status(200).json(rooms);
  } catch (error) {
    res.status(500).json("Failed to get rooms", error);
  }
};

module.exports = { createRoom, getAllRooms };
