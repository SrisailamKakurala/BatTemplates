// store/utilsStore.ts
import { create } from "zustand";

interface UtilsState {
  loading: boolean;
  setLoading: (state: boolean) => void;
  reloadProfile: boolean;
  setReloadProfile: (state: boolean) => void;
}

const useUtilsStore = create<UtilsState>((set) => ({
  loading: false,
  setLoading: (state) => set({ loading: state }),
  reloadProfile: false,
  setReloadProfile: (state) => set({ reloadProfile: state }),
}));

export default useUtilsStore;