import React from "react";
import { FaArrowUp, FaArrowDown } from "react-icons/fa";

interface UserActionsProps {
  onPromote: () => void;
  onDemote: () => void;
}

const UserActions: React.FC<UserActionsProps> = ({ onPromote, onDemote }) => {
  return (
    <div className="flex justify-center items-center gap-2">
      <button
        className="text-green-500 hover:text-green-700"
        title="Promote"
        onClick={onPromote}
      >
        <FaArrowUp />
      </button>
      <button
        className="text-red-500 hover:text-red-700"
        title="Demote"
        onClick={onDemote}
      >
        <FaArrowDown />
      </button>
    </div>
  );
};

export default UserActions;
