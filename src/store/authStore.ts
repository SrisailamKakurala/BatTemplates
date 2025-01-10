// store/authStore.ts
import { create } from "zustand";

interface AuthState {
  isAuthenticated: boolean;
  user: { id: string; name: string } | null;
  signIn: (user: { id: string; name: string }) => void;
  signOut: () => void;
}

const useAuthStore = create<AuthState>((set) => ({
  isAuthenticated: false,
  user: null,
  signIn: (user) => set({ isAuthenticated: true, user }),
  signOut: () => set({ isAuthenticated: false, user: null }),
}));

export default useAuthStore;
