import { io, Socket } from "socket.io-client";

// Use current origin in the browser → Next.js rewrites /socket.io to backend
// Server-side fallback → localhost
const SOCKET_URL =
  typeof window !== "undefined"
    ? window.location.origin
    : (process.env.NEXT_PUBLIC_SOCKET_URL || "http://localhost:3000");

let socket: Socket | null = null;

export const getSocket = (): Socket => {
  if (!socket) {
    socket = io(SOCKET_URL, {
      autoConnect: false,
      withCredentials: true,
      path: "/socket.io", // matches Next.js rewrite
    });
  }
  return socket;
};

export const connectSocket = (userId: string): void => {
  const s = getSocket();
  if (!s.connected) {
    s.connect();
  }
  s.emit("join", userId);
};

export const disconnectSocket = (): void => {
  if (socket?.connected) {
    socket.disconnect();
  }
};