import { io } from "socket.io-client";

// "undefined" means the URL will be computed from the `window.location` object
const URL =
  process.env.NODE_ENV === "production"
    ? "https://socket-backend-nw30.onrender.com"
    : `http://localhost:1111`;

export const socket = io(URL, {
  autoConnect: true,
});
