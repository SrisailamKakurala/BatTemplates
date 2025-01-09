import {create} from "zustand";

interface TemplateState {
  templates: Array<{ id: string; name: string; description: string }>;
  addTemplate: (template: { id: string; name: string; description: string }) => void;
  removeTemplate: (id: string) => void;
}

const useTemplateStore = create<TemplateState>((set) => ({
  templates: [],
  addTemplate: (template) =>
    set((state) => ({ templates: [...state.templates, template] })),
  removeTemplate: (id) =>
    set((state) => ({
      templates: state.templates.filter((template) => template.id !== id),
    })),
}));

export default useTemplateStore;
