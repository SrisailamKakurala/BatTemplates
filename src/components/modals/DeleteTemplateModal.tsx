import React from "react";
import Button from "@/components/buttons/Button";
import { deleteTemplate } from "@/firebase/services/templateServices/deleteTemplateService";
import { useToast } from "@/hooks/ui/useToast";

interface DeleteTemplateModalProps {
  templateId: string;
  onClose: () => void;
}

const DeleteTemplateModal: React.FC<DeleteTemplateModalProps> = ({ templateId, onClose }) => {
  const { addToast } = useToast(); // Get addToast function

  const confirmDelete = async () => {
    try {
      await deleteTemplate(templateId);
      addToast("Template deleted successfully!", "success");
      onClose();
    } catch (error) {
      console.error("Failed to delete template:", error);
      addToast("Failed to delete template. Please try again.", "error");
    }
  };

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center z-100">
      <div className="bg-secondary rounded-lg p-6 w-full max-w-sm">
        <h2 className="text-xl font-bold text-primary">Confirm Deletion</h2>
        <p className="text-slate-300 my-4">Are you sure you want to delete this template?</p>
        <div className="flex justify-end gap-4">
          <Button onClick={onClose} label="Cancel" className="bg-gray-600" />
          <Button onClick={confirmDelete} label="Delete" className="bg-primary hover:bg-primaryHover" />
        </div>
      </div>
    </div>
  );
};

export default DeleteTemplateModal;
