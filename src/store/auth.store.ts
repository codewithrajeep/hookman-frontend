import { connectSocket, disconnectSocket } from "@/lib/socket";
import { User } from "@/types";
import { create } from "zustand";
import { persist } from "zustand/middleware";

interface AuthState {
  user: User | null;
  isAuthenticated: boolean;
  setUser: (user: User) => void;
  clearUser: () => void;
}

export const useAuthStore = create<AuthState>()(
  persist(
    (set) => ({
      user: null,
      isAuthenticated: false,

      // Call after successful login and store user and connects socket
      setUser: (user: User) => {
        set({ user, isAuthenticated: true });
        connectSocket(user.id);
      },

      // Call on logout and clears user and disconnects socket
      clearUser: () => {
        set({ user: null, isAuthenticated: false });
        disconnectSocket();
      },
    }),
    {
      name: "hookman-auth", // key in localStore, stores only user not token (token is httpOnly cookie)
      partialize: (state) => ({
        user: state.user,
        isAuthenticated: state.isAuthenticated,
      }),
    },
  ),
);
