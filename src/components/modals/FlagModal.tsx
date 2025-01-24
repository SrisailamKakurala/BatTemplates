import React, { useState } from "react";
import Button from "@/components/buttons/Button";

interface FlagModalProps {
  isOpen: boolean;
  onClose: () => void;
  onSubmit: (reason: string) => void;
  type: string; // Add type prop
}

const FlagModal: React.FC<FlagModalProps> = ({ isOpen, onClose, onSubmit, type }) => {
  const [reason, setReason] = useState("");

  if (!isOpen) return null;

  return (
    <div className="absolute inset-0 bg-black bg-opacity-70 flex items-center justify-center p-4">
      <div className="bg-secondary p-6 rounded-lg shadow-lg w-full max-w-md">
        <h2 className="text-xl font-bold mb-4 text-primaryHover">
          Flag {type} {/* Display the type in the header */}
        </h2>
        <textarea
          className="w-full p-2 border border-gray-300 rounded-md mb-4 bg-white text-gray-800"
          placeholder="Why are you flagging this template?"
          value={reason}
          onChange={(e) => setReason(e.target.value)}
        />
        <div className="flex justify-end space-x-3">
          <Button
            label="Cancel"
            onClick={onClose}
            className="bg-gray-500 text-white hover:bg-gray-600 duration-200"
          />
          <Button
            label="Submit"
            onClick={() => {
              onSubmit(reason);
              onClose();
            }}
            className="bg-primary text-white hover:bg-primaryHover duration-200"
          />
        </div>
      </div>
    </div>
  );
};

export default FlagModal;