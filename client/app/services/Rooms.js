import { getRoomGuests, updateRoom, getActiveRoom } from "../api";

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
    //   history_guest: users.data.filter((guest) => guest !== userId),
    };

    const res = await updateRoom({ id: roomId, data: data });
    return res;
  } catch (error) {
    throw error;
  }
};
const accessRoom = async ({data: data}) => {
  const res = await getActiveRoom({data: data});
  const roomInfo = res.data;

  // if roomInfo is empty, navigate to create room
  return roomInfo;
};
export { joinRoom, leaveRoom, accessRoom };
