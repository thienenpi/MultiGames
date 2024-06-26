import ApiManager from "./ApiManager";

// const getMessages = async ({ userId, friendId }) => {
//   try {
//     const url = `/messages?userId=${userId}&friendId=${friendId}`;
//     const config = {
//       method: "GET",
//       headers: {
//         "Content-Type": "application/json",
//       },
//     };

//     const res = await ApiManager(url, config);
//     return res;
//   } catch (error) {
//     if (error.response) {
//       return error.response;
//     } else {
//       throw error;
//     }
//   }
// };

// const sendMessage = async ({ senderId, recipientId, message }) => {
//   try {
//     const url = "/message/send";
//     const config = {
//       method: "POST",
//       headers: {
//         "Content-Type": "application/json",
//       },
//       data: {
//         senderId,
//         recipientId,
//         message,
//       },
//     };

//     const res = await ApiManager(url, config);
//     return res;
//   } catch (error) {
//     if (error.response) {
//       return error.response;
//     } else {
//       throw error;
//     }
//   }
// };

const getUnreadMessagesCount = async ({ userId, friendId }) => {
  try {
    const url = `/message/unread-count/${userId}/${friendId}`;
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
  // getMessages,
  // sendMessage,
  getUnreadMessagesCount,
};
