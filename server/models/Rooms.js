const mongoose = require("mongoose");

const RoomSchema = new mongoose.Schema(
  {
    name: { type: String, required: true },
    isPassword: { type: Boolean, required: true },
    password: { type: String, required: true },
    capacity: { type: Number, required: true },
    mode: { type: String, required: true },
    owner: { type: String, required: true },
    list_guest: { type: Array, required: true },
    chatGame: { type: String, required: true },
    status: { type: String, required: true },
  },
  { timestamps: true }
);

module.exports = mongoose.model("Room", RoomSchema);
