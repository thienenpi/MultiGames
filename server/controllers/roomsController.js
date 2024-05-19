const Room = require("../models/Rooms");

const createRoom = async (req, res) => {
  try {
    const newRoom = new Room(req.body);
    await newRoom.save();
    res.status(200).json("Created room");
  } catch (error) {
    res
      .status(500)
      .json({ message: "Failed to create room", error: error.message });
  }
};

const getRooms = async (req, res) => {
  try {
    const rooms = await Room.find();
    res.status(200).json(rooms);
  } catch (error) {
    res.status(500).json("Failed to retrieve rooms", error);
  }
};

const getRoom = async (req, res) => {
  try {
    const room = await Room.findById(req.params.id);
    res.status(200).json(room);
  } catch (error) {
    res.status(500).json("Failed to retrieve room", error);
  }
};

const updateRoom = async (req, res) => {
  try {
    // find room
    const room = await Room.findById(req.params.id);

    // if room is not found
    if (!room) {
      res.status(404).json("Room not found");
      return;
    }

    // update room
    await room.updateOne({ $set: req.body });
    res.status(200).json("Room updated");
  } catch (error) {
    res.status(500).json("Failed to update room", error);
  }
};

const deleteRoom = async (req, res) => {
  try {
    await Room.findByIdAndDelete(req.params.id);
    res.status(200).json("Room deleted");
  } catch (error) {
    res.status(500).json("Failed to delete room", error);
  }
};

const getRoomActive = async (req, res) => {
  try {
    const rooms = await Room.findOne({ status: "active" });

    // check if there is no active room
    if (!rooms) {
      // response with null
      res.status(200).json(null);
      return;
    }

    res.status(200).json(rooms);
  } catch (error) {
    res.status(500).json("Failed to retrieve room active games", error);
  }
};

//-----------------------------------------------------------------------------------

// const playersGet = async (req, res) => {
//   try {
//     const room = await Room.findById(req.params.id).populate('players');
//     res.status(200).json(room.players);
//   } catch (error) {
//     res.status(500).json('Failed to retrieve players', error);
//   }
// };

// const gamesGet = async (req, res) => {
//   try {
//     const room = await Room.findById(req.params.id).populate('games');
//     res.status(200).json(room.games);
//   } catch (error) {
//     res.status(500).json('Failed to retrieve games', error);
//   }
// };

// const gameGet = async (req, res) => {
//   try {
//     const room = await Room.findById(req.params.id).populate('games');
//     const game = room.games.find(game => game._id == req.params.gameId);
//     res.status(200).json(game);
//   } catch (error) {
//     res.status(500).json('Failed to retrieve game', error);
//   }
// };

// const gamePlayersGet = async (req, res) => {
//   try {
//     const room = await Room.findById(req.params.id).populate('games');
//     const game = room.games.find(game => game._id == req.params.gameId);
//     res.status(200).json(game.players);
//   } catch (error) {
//     res.status(500).json('Failed to retrieve game players', error);
//   }
// };

// const gamePlayerGet = async (req, res) => {
//   try {
//     const room = await Room.findById(req.params.id).populate('games');
//     const game = room.games.find(game => game._id == req.params.gameId);
//     const player = game.players.find(player => player._id == req.params.playerId);
//     res.status(200).json(player);
//   } catch (error) {
//     res.status(500).json('Failed to retrieve game player', error);
//   }
// };

module.exports = {
  createRoom,
  getRooms,
  getRoom,
  updateRoom,
  deleteRoom,
  getRoomActive,
  // playersGet,
  // gamesGet,
  // gameGet,
  // gamePlayersGet,
  // gamePlayerGet
};
