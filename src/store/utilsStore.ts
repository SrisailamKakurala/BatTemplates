// store/utilsStore.ts
import { create } from "zustand";

interface UtilsState {
  loading: boolean;
  setLoading: (state: boolean) => void;
}

const useUtilsStore = create<UtilsState>((set) => ({
  loading: false,
  setLoading: (state) => set({ loading: state }),
}));

export default useUtilsStore;
