const mongoose = require('mongoose');

const RoomSchema = new mongoose.Schema(
    {
        name: { type: String, required: true },
        isPassword: { type: Boolean, required: true },
        password: { type: String, required: false },
        capacity: { type: Number, required: true },
        mode: { type: String, required: true },
        owner: { type: String, required: true },
        list_guest: { type: Array, required: false },
        status: { type: String, required: false },
    },
    { timestamps: true }
); 

module.exports = mongoose.model('Room', RoomSchema);