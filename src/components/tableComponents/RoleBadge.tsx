import React from "react";

interface RoleBadgeProps {
  role: string;
}

const RoleBadge: React.FC<RoleBadgeProps> = ({ role }) => {
  const getBadgeStyle = () => {
    switch (role) {
      case "admin":
        return "bg-primary text-white";
      case "member":
        return "bg-yellow-600 text-black";
      default:
        return "bg-blue-600 text-white";
    }
  };

  return (
    <span className={`inline-block px-2 py-1 rounded mx-1 text-sm ${getBadgeStyle()}`}>
      {role}
    </span>
  );
};

export default RoleBadge;
