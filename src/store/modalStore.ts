import {create} from "zustand";

interface ModalState {
  activeModal: "signin" | "register" | "none";
  openModal: (modalType: "signin" | "register") => void;
  closeModal: () => void;
}

const useModalStore = create<ModalState>((set) => ({
  activeModal: "none", // No modal is visible initially
  openModal: (modalType) => set({ activeModal: modalType }), // Show the specific modal
  closeModal: () => set({ activeModal: "none" }), // Close the modal
}));

export default useModalStore;
