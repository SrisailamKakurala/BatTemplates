import { create } from "zustand";
import { persist, devtools } from "zustand/middleware";

interface User {
  id: string;
  name: string | null;
  email: string;
  photoURL: string | null;
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
        signIn: (user) =>
          set({
            isAuthenticated: true,
            user: {
              ...user,
            },
          }),
        signOut: () => set({ isAuthenticated: false, user: null }),
      }),
      {
        name: "auth-storage",
        partialize: (state) => ({ isAuthenticated: state.isAuthenticated, user: state.user }), // Ensure the id is part of user
        onRehydrateStorage: () => (state) => {
          const hasAccessToken = document.cookie.includes("accessToken=");
          if (!hasAccessToken) {
            state?.signOut();
          }
        },
      }
    )
  )
);


export default useAuthStore;
