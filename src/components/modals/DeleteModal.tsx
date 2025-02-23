import React from "react";
import Button from "@/components/buttons/Button";
import { deleteTemplate } from "@/firebase/services/templateServices/deleteTemplate.service";
import { deleteStructure } from "@/firebase/services/folderServices/deleteStructure.service"; // Structure delete service
import { useToast } from "@/hooks/ui/useToast";

interface DeleteModalProps {
  id: string;
  type: "template" | "structure"; // Determines the delete action
  onClose: () => void;
}

const DeleteModal: React.FC<DeleteModalProps> = ({ id, type, onClose }) => {
  const { addToast } = useToast();

  const confirmDelete = async () => {
    try {
      if (type === "template") {
        await deleteTemplate(id);
        addToast("Template deleted successfully!", "success");
      } else if (type === "structure") {
        await deleteStructure(id);
        addToast("Structure deleted successfully!", "success");
      }
      onClose();
    } catch (error) {
      console.error(`Failed to delete ${type}:`, error);
      addToast(`Failed to delete ${type}. Please try again.`, "error");
    }
  };

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center z-100 px-5">
      <div className="bg-secondary rounded-lg p-6 w-full max-w-sm">
        <h2 className="text-xl font-bold text-primary">Confirm Deletion</h2>
        <p className="text-slate-300 my-4">
          Are you sure you want to delete this {type}?
        </p>
        <div className="flex justify-end gap-4">
          <Button onClick={onClose} label="Cancel" className="bg-gray-600" />
          <Button onClick={confirmDelete} label="Delete" className="bg-primary hover:bg-primaryHover" />
        </div>
      </div>
    </div>
  );
};

export default DeleteModal;
