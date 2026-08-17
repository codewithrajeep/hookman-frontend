import { io, Socket } from "socket.io-client";

const SOCKET_URL =
  process.env.NEXT_PUBLIC_SOCKET_URL || "http://localhost:3000";

// singleton - one single socket for the whole app
let socket: Socket | null = null;

export const getSocket = (): Socket => {
  if (!socket) {
    socket = io(SOCKET_URL, {
      autoConnect: false, // connect manually after login
      withCredentials: true, // send httpOnly cookie for auth
    });
  }
  return socket;
};

// call after successful login, connects and joins the user's room
export const connectSocket = (userId: string): void => {
  const s = getSocket();
  if (!s.connected) {
    s.connect();
  }
  s.emit("join", userId);
};

// call on logout, cleans up the connection
export const disconnectSocket = (): void => {
  if (socket?.disconnected) {
    socket.disconnect();
  }
};
