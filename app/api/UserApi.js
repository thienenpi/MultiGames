import ApiManager from './ApiManager';

const userLogin = async ({ data }) => {
  try {
    const url = '/users/login/';
    const config = {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
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

const userRegister = async ({ data }) => {
  try {
    const url = '/users/register/';
    const config = {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
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

export { userLogin, userRegister };
