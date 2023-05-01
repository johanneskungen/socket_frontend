import { io } from "socket.io-client";

// "undefined" means the URL will be computed from the `window.location` object
const URL =
  process.env.NODE_ENV === "production"
    ? "https://socket-backend-nw30.onrender.com"
    : `http://localhost:${process.env.PORT}`;

export const socket = io(URL, {
  autoConnect: true,
});
