import React, { ReactNode } from "react";
import { NavLink } from "react-router-dom";

type NavItemProps = {
  icon: ReactNode; // Accepts JSX for icons
  label: string;
  to: string;
  classNames?: string;
};

const NavItem: React.FC<NavItemProps> = ({ icon, label, to, classNames }) => {
  return (
    <NavLink
      to={to}
      className={({ isActive }) =>
        `flex items-center gap-3 p-2 rounded-lg text-primary font-semibold text-xl hover:bg-white hover:bg-opacity-[0.03] ${
          isActive ? "bg-white bg-opacity-5 font-bold" : ""
        } ${classNames}`
      }
    >
      <span className="h-10 w-10 flex items-center justify-center ">{icon}</span> {/* Icon rendered here */}
      <span>{label}</span>
    </NavLink>
  );
};

export default NavItem;
