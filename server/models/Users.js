const mongoose = require("mongoose");

const UserSchema = new mongoose.Schema(
  {
    name: { type: String, required: true },
    birth: { type: Date, required: false },
    email: { type: String, required: true, unique: true },
    password: { type: String, required: true },
    role_id: { type: String, required: true },
    status: { type: String, required: true },
    avatarUrl: {
      type: String,
      required: false,
      default: "https://multigames.blob.core.windows.net/images/user.png",
    },
    money: { type: Number, required: false, default: 0 },
    friends: [
      {
        type: mongoose.Schema.Types.ObjectId,
        ref: "User",
      },
    ],
    sentFriendRequests: [
      {
        type: mongoose.Schema.Types.ObjectId,
        ref: "User",
      },
    ],
    bag: { type: Array, required: false },
    socketId: { type: String, required: false, unique: true },
  },
  { timestamps: true }
);

module.exports = mongoose.model("User", UserSchema);
