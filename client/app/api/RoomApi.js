import ApiManager from "./ApiManager";

const createRoom = async ({ data }) => {
  try {
    const url = "/rooms/";
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

export { createRoom };