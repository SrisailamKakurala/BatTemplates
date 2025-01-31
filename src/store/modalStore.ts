import { create } from "zustand";

interface ModalState {
  activeModal: "signin" | "register" | "donate" | "none";
  openModal: (modalType: "signin" | "register" | "donate") => void;
  closeModal: () => void;
}

const useModalStore = create<ModalState>((set) => ({
  activeModal: "none", // No modal is visible initially
  openModal: (modalType) =>
    set((state) => {
      if (state.activeModal === modalType) return {}; // Prevent re-opening same modal
      return { activeModal: modalType };
    }),
  closeModal: () => set({ activeModal: "none" }),
}));

export default useModalStore;
