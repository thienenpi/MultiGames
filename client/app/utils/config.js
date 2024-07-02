import io from "socket.io-client";

// const BASE_URL = "https://multigames.azurewebsites.net/api";
const BASE_URL = "http://10.0.229.17:3000/api";

const socket = io(
  BASE_URL.slice(0, -4),
  {
    path: "/api/whiteBoard/",
    autoConnect: false,
  },
);

const spySocket = io(
  BASE_URL.slice(0, -4),
  {
    path: "/api/spyGame/",
    autoConnect: false,
  },
);

export { BASE_URL, socket, spySocket };