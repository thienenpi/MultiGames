import io from "socket.io-client";

const BASE_URL = "https://multigames.azurewebsites.net/api";
// const BASE_URL = "http://172.16.1.150:3000/api";
const socket = io(BASE_URL.slice(0, -4), {
  path: "/api/whiteBoard/",
});

export { BASE_URL, socket };
