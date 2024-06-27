import ApiManager from "./ApiManager";

const createRoom = async ({ data }) => {
  try {
    const url = "/rooms/create";
    const config = {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      data: data,
    };

    const res = await ApiManager(url, config);
    return res;
  } catch (error) {
    if (error.response) {
      return error.response;
    } else {
      throw error;
    }
  }
};

const getRoom = async ({ id }) => {
  try {
    const url = `/rooms/roomId=${id}`;
    const config = {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
      },
    };

    const res = await ApiManager(url, config);
    return res;
  } catch (error) {
    if (error.response) {
      return error.response;
    } else {
      throw error;
    }
  }
};

const getRooms = async () => {
  try {
    const url = "/rooms/";
    const config = {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
      },
    };

    const res = await ApiManager(url, config);
    return res;
  } catch (error) {
    if (error.response) {
      return error.response;
    } else {
      throw error;
    }
  }
};

const getActiveRoom = async ({data}) => {
  try {
    const url = "/rooms/active/";
    const config = {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      data: data,
    };

    const res = await ApiManager(url, config);
    return res;
  } catch (error) {
    if (error.response) {
      return error.response;
    } else {
      throw error;
    }
  }
};

const getRoomsOwner = async ({ id }) => {
  try {
    const url = `/rooms/ownerId=${id}`;
    const config = {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
      },
    };

    const res = await ApiManager(url, config);
    return res;
  } catch (error) {
    if (error.response) {
      return error.response;
    } else {
      throw error;
    }
  }
};

const getRoomsGuest = async ({ id }) => {
  try {
    const url = `/rooms/guestId=${id}`;
    const config = {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
      },
    };

    const res = await ApiManager(url, config);
    return res;
  } catch (error) {
    if (error.response) {
      return error.response;
    } else {
      throw error;
    }
  }
};

const getRoomGuests = async ({ id }) => {
  try {
    const url = `/rooms/id=${id}/guests`;
    const config = {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
      },
    };

    const res = await ApiManager(url, config);
    return res;
  } catch (error) {
    if (error.response) {
      return error.response;
    } else {
      throw error;
    }
  }
};

const updateRoom = async ({ id, data }) => {
  try {
    const url = `/rooms/id=${id}`;
    const config = {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
      },
      data: data,
    };

    const res = await ApiManager(url, config);
    return res;
  } catch (error) {
    if (error.response) {
      return error.response;
    } else {
      throw error;
    }
  }
};

const deleteRoom = async ({ id }) => {
  try {
    const url = `/rooms/id=${id}`;
    const config = {
      method: "DELETE",
      headers: {
        "Content-Type": "application/json",
      },
    };

    const res = await ApiManager(url, config);
    return res;
  } catch (error) {
    if (error.response) {
      return error.response;
    } else {
      throw error;
    }
  }
};

const isRoomFull = async ({ id }) => {
  try {
    const url = `/rooms/id=${id}/isFull`;
    const config = {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
      },
    };

    const res = await ApiManager(url, config);
    return res;
  } catch (error) {
    if (error.response) {
      return error.response;
    } else {
      throw error;
    }
  }
};

export {
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
};
