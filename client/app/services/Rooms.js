import {
  getRoomGuests,
  updateRoom,
  getActiveRoom,
  getRoomHistoryGuests,
  getRoom,
} from "../api";

const joinRoom = async ({ roomId, userId }) => {
  try {
    const guests = await getRoomGuests({ id: roomId });
    var history_guests = await getRoomHistoryGuests({ id: roomId });
    const roomInfo = await getRoom({ id: roomId });

    if (roomInfo.data.status === "playing") {
      return { status: "playing" };
    }

    if (guests.data.includes(userId)) {
      return;
    }

    if (!history_guests.data.includes(userId)) {
      history_guests.data.push(userId);
    }

    const data = {
      list_guest: [...guests.data, userId],
      history_guest: history_guests.data,
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
      //   history_guest: users.data.filter((guest) => guest !== userId),
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
