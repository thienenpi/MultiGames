import {
  getRoomGuests,
  updateRoom,
  getActiveRoom,
  getRoomHistoryGuests,
  getRoom,
} from "../api";

const joinRoom = async ({ roomId, userId }) => {
  try {
    const roomInfo = await getRoom({ id: roomId });
    const guests = roomInfo.data.list_guest;
    var history_guests = roomInfo.data.history_guest;

    if (roomInfo.data.status === "playing") {
      return { status: "playing" };
    }

    if (guests.includes(userId)) {
      return;
    }

    if (!history_guests.includes(userId)) {
      history_guests.push(userId);
    }

    const data = {
      list_guest: [...guests, userId],
      history_guest: history_guests,
    };

    const res = await updateRoom({ id: roomId, data: data });
    return res;
  } catch (error) {
    throw error;
  }
};

const leaveRoom = async ({ roomId, userId }) => {
  try {
    const users = await getRoomGuests({ id: roomId });

    const data = {
      list_guest: users.data.filter((guest) => guest !== userId),
    };

    const res = await updateRoom({ id: roomId, data: data });
    return res;
  } catch (error) {
    throw error;
  }
};
const accessRoom = async ({ data: data }) => {
  const res = await getActiveRoom({ data: data });
  const roomInfo = res.data;

  // if roomInfo is empty, navigate to create room
  return roomInfo;
};
export { joinRoom, leaveRoom, accessRoom };
