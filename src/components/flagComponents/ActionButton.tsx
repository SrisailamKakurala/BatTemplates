import React from "react";
import Button from "@/components/buttons/Button";

interface ActionButtonProps {
  label: string;
  icon: React.ReactNode;
  onClick: () => void;
  className: string;
}

const ActionButton: React.FC<ActionButtonProps> = ({ label, icon, onClick, className }) => {
  return (
    <Button
      icon={icon}
      label={label}
      onClick={onClick}
      className={`${className} px-4 py-2 rounded-lg hover:opacity-80 transition`}
    />
  );
};

export default ActionButton;
