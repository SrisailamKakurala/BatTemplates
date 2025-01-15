// userStore.ts
import { create } from "zustand";

export interface User {
  id: string;
  name: string;
  email: string;
  photoURL: string | null;
  roles: string[];
  location: string;
  personalLinks: string[];
  noOfContributions: number;
  contributions: Array<{ id: string; type: "template" | "folder"; name: string }>;
  followersCount: number;
  followingCount: number;
  bookmarks: Array<{ id: string; type: "folder" | "template" }>;
}

interface UserState {
  user: Partial<User> | null;
  setUser: (user: User) => void;
  updateUser: (partialUser: Partial<User>) => void;
  clearUser: () => void;
}

const useUserStore = create<UserState>((set) => ({
  user: null,
  setUser: (user) => set({ user }),
  updateUser: (partialUser) =>
    set((state) => ({
      user: state.user ? { ...state.user, ...partialUser } : null,
    })),
  clearUser: () => set({ user: null }),
}));

export default useUserStore;
