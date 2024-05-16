import ApiManager from './ApiManager';

const roomCreate = async ({data}) => {
  try {
    const url = '/rooms/';
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

const roomGet = async ({data}) => {
  try {
    const url = '/rooms/' + data.id;
    const config = {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
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

const roomsGet = async ({data}) => {
  try {
    const url = '/rooms/';
    const config = {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
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

const roomActiveGamesGet = async ({data}) => {
  try {
    const url = '/rooms/' + data.id + '/games/';
    const config = {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
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

const playersGet = async ({data}) => {
  try {
    const url = '/rooms/' + data.id + '/players/';
    const config = {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
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

const gamesGet = async ({data}) => {
  try {
    const url = '/rooms/' + data.id + '/games/';
    const config = {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
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

const gameGet = async ({data}) => {
  try {
    const url = '/rooms/' + data.id + '/games/' + data.gameId;
    const config = {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
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

const roomUpdate = async ({data}) => {
  try {
    const url = '/rooms/' + data.id;
    const config = {
      method: 'PUT',
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

const roomDelete = async ({data}) => {
  try {
    const url = '/rooms/' + data.id;
    const config = {
      method: 'DELETE',
      headers: {
        'Content-Type': 'application/json',
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

const gameCreate = async ({data}) => {
  try {
    const url = '/rooms/' + data.id + '/games/';
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

const gameUpdate = async ({data}) => {
  try {
    const url = '/rooms/' + data.id + '/games/' + data.gameId;
    const config = {
      method: 'PUT',
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

const gameDelete = async ({data}) => {
  try {
    const url = '/rooms/' + data.id + '/games/' + data.gameId;
    const config = {
      method: 'DELETE',
      headers: {
        'Content-Type': 'application/json',
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

const playerCreate = async ({data}) => {
  try {
    const url = '/rooms/' + data.id + '/players/';
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

export { 
  roomCreate, 
  roomGet, 
  roomsGet, 
  roomActiveGamesGet, 
  playersGet, 
  gamesGet, 
  gameGet, 
  roomUpdate, 
  roomDelete, 
  gameCreate, 
  gameUpdate, 
  gameDelete, 
  playerCreate
};