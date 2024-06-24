import io from "socket.io-client";

// const BASE_URL = "https://multigames.azurewebsites.net/api";
const BASE_URL = "http://10.0.154.74:3000/api";

const socket = io(BASE_URL.slice(0, -4), {
  path: "/api/whiteBoard/",
});
const spySocket = io(BASE_URL.slice(0, -4), {
  path: "/api/spyGame/",
});
export { BASE_URL, socket, spySocket };
