// store/authStore.ts
import { create } from "zustand";
import { persist, devtools } from "zustand/middleware";

interface User {
  id: string;
  name: string | null;
  email: string;
  photoURL: string | null;
  emailVerified: boolean;
  accessToken: string;
}

interface AuthState {
  isAuthenticated: boolean;
  user: User | null;
  signIn: (user: User) => void;
  signOut: () => void;
}

const useAuthStore = create<AuthState>()(
  devtools(
    persist(
      (set) => ({
        isAuthenticated: false,
        user: null,
        signIn: (user) => set({ isAuthenticated: true, user }),
        signOut: () => set({ isAuthenticated: false, user: null }),
      }),
      {
        name: "auth-storage", // LocalStorage key
        partialize: (state) => ({ isAuthenticated: state.isAuthenticated, user: state.user }), // Persist only necessary fields
      }
    )
  )
);

export default useAuthStore;
