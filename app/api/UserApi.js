import ApiManager from './ApiManager';

const userLogin = async ({ data }) => {
  try {
    const res = await ApiManager('/users/login/', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      data: data,
    });

    return res;
  } catch (error) {
    return { statusText: 'Wrong password', status: 401 };
  }
};

export { userLogin };
