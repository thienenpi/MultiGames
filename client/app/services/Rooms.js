import { getRoomGuests, updateRoom } from "../api";

const joinRoom = async ({ roomId, userId }) => {
  try {
    const users = await getRoomGuests({ id: roomId });

    if (users.data.includes(userId)) {
      return;
    }

    const data = {
      list_guest: [...users.data, userId],
      history_guest: [...users.data, userId],
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
      history_guest: users.data.filter((guest) => guest !== userId),
    };

    const res = await updateRoom({ id: roomId, data: data });
    return res;
  } catch (error) {
    throw error;
  }
};

export { joinRoom, leaveRoom };
