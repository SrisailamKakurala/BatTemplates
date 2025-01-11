import { create } from "zustand";

interface ModalState {
  activeModal: "signin" | "register" | "none";
  openModal: (modalType: "signin" | "register") => void;
  closeModal: () => void;
}

const useModalStore = create<ModalState>((set) => ({
  activeModal: "none", // No modal is visible initially
  openModal: (modalType) =>
    set((state) => {
      // Prevent opening the same modal if already open
      if (state.activeModal === modalType) return {};
      return { activeModal: modalType };
    }),
  closeModal: () => set({ activeModal: "none" }),
}));

export default useModalStore;
