import ApiManager from "./ApiManager";

const getKeyWords = async () => {
    try {
      const url = "/keywords/";
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

  export { getKeyWords };