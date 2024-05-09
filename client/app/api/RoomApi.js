import ApiManager from './ApiManager';

const roomCreate = async (data) => {
  try {
    const url = '/rooms/create/';
    const config = {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      data: data,
    };
    console.log(data);
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

export { roomCreate };