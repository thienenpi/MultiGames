import ApiManager from "./ApiManager";

const userLogin = async ({ data }) => {
  try {
    const url = "/users/login/";
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

const userLogout = async ({ id }) => {
  try {
    const url = `/users/logout/id=${id}`;
    const config = {
      method: "POST",
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

const userRegister = async ({ data }) => {
  try {
    const url = "/users/register/";
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

const getUserById = async ({ id }) => {
  try {
    const url = `/users/id=${id}`;
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

const sendFriendRequest = async ({ senderId, recipientId }) => {
  try {
    const url = "/users/sendFriendRequest";
    const config = {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      data: { senderId, recipientId },
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

const acceptFriendRequest = async ({ userId, friendId }) => {
  try {
    const url = "/users/acceptFriendRequest";
    const config = {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      data: { userId, friendId },
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
  userLogin,
  userLogout,
  userRegister,
  getUserById,
  sendFriendRequest,
  acceptFriendRequest,
};
