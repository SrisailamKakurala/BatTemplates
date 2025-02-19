import React, { useState } from "react";
import Button from "@/components/buttons/Button";
import { flagContent } from "@/firebase/services/adminServices/flag.service"; // Import the service
import { useToast } from "@/hooks/ui/useToast";

interface FlagModalProps {
  isOpen: boolean;
  onClose: () => void;
  type: string;
  userId: string;
  contentId: string;
  title: string;
  source: string;
}

const FlagModal: React.FC<FlagModalProps> = ({ isOpen, onClose, type, userId, contentId, title, source }) => {
  const [reason, setReason] = useState("");
  const { addToast } = useToast();

  // Get userEmail from localStorage
  const flaggedBy = localStorage.getItem("auth-storage")
    ? JSON.parse(localStorage.getItem("auth-storage")!).state?.user?.email
    : null;

  const handleSubmit = async () => {
    if (!reason.trim()) {
      addToast("Please enter a reason for flagging.", "error");
      return;
    }

    if (!flaggedBy) {
      addToast("User is not logged in.", "error");
      return;
    }

    const success = await flagContent(contentId, userId, flaggedBy, reason, type, title, source);
    if (success) {
      addToast("Content flagged successfully.", "success");
      onClose();
    } else {
      addToast("Failed to flag the content.", "error");
    }
  };

  if (!isOpen) return null;

  return (
    <div className="absolute inset-0 bg-black bg-opacity-70 flex items-center justify-center p-4">
      <div className="bg-secondary p-6 rounded-lg shadow-lg w-full max-w-md">
        <h2 className="text-xl font-bold mb-4 text-primaryHover">Flag {type}</h2>
        <p className="text-sm text-gray-400 mb-2">Title: {title}</p>
        <p className="text-sm text-gray-400 mb-2">
          Source:{" "}
          <a href={source} target="_blank" rel="noopener noreferrer" className="text-blue-400 underline">
            {source}
          </a>
        </p>
        <textarea
          className="w-full p-2 border border-gray-300 rounded-md mb-4 bg-white text-gray-800"
          placeholder="Why are you flagging this content?"
          value={reason}
          onChange={(e) => setReason(e.target.value)}
        />
        <div className="flex justify-end space-x-3">
          <Button label="Cancel" onClick={onClose} className="bg-gray-500 text-white hover:bg-gray-600 duration-200" />
          <Button label="Submit" onClick={handleSubmit} className="bg-primary text-white hover:bg-primaryHover duration-200" />
        </div>
      </div>
    </div>
  );
};

export default FlagModal;
