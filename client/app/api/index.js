import {
  userLogin,
  userLogout,
  userRegister,
  getUsers,
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
  getRoomGuests,
  getRoomHistoryGuests,
  getAllRoomsActive,
} from "./RoomApi";

import { getMessages, sendMessage, markMessagesAsSeen } from "./MessageApi";

import { getKeyWords } from "./KeywordApi";

export {
  // UserApi
  userLogin,
  userLogout,
  userRegister,
  getUsers,
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
  getRoomHistoryGuests,
  getAllRoomsActive,

  // MessageApi
  getMessages,
  sendMessage,
  markMessagesAsSeen,

  // KeywordApi
  getKeyWords,
};
