import {
  userLogin,
  userLogout,
  userRegister,
  getUserById,
  sendFriendRequest,
  acceptFriendRequest,
} from "./UserApi";

import {
  createRoom,
  getRoom,
  getRooms,
  getActiveRoom,
  getRoomsOwner,
  getRoomsGuest,
  updateRoom,
  deleteRoom,
  isRoomFull,
  getRoomGuests
} from "./RoomApi";

import { getMessages, sendMessage, markMessagesAsSeen } from "./MessageApi";

export {
  // UserApi
  userLogin,
  userLogout,
  userRegister,
  getUserById,
  sendFriendRequest,
  acceptFriendRequest,

  // RoomApi
  createRoom,
  getRoom,
  getRooms,
  getActiveRoom,
  getRoomsOwner,
  getRoomsGuest,
  updateRoom,
  deleteRoom,
  isRoomFull,
  getRoomGuests,

  // MessageApi
  getMessages,
  sendMessage,
  markMessagesAsSeen,
};
