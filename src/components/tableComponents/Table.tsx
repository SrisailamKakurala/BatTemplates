// components/Table.tsx
import React, { useEffect } from "react";
import RoleBadge from "@/components/tableComponents/RoleBadge";
import UserActions from "@/components/tableComponents/UserActions";
import formatDate from "@/utils/formatDate";
import { TableData } from "@/constants/interfaces";
import { promoteUser } from "@/firebase/services/adminServices/promotion.service";
import { demoteUser } from "@/firebase/services/adminServices/demotion.service";
import { useToast } from "@/hooks/ui/useToast";

interface TableProps {
  data: TableData[];
}

const Table: React.FC<Partial<TableProps>> = ({ data = [] }) => {
  const { addToast } = useToast();

  useEffect(() => {
    console.log(data);
  }, []);

  const handlePromote = async (userId: string, role: string) => {
    try {
      console.log(userId, role);
      await promoteUser(userId, role);
      addToast(`User promoted to ${role} successfully`, "success");
    } catch (error) {
      addToast("Failed to promote user", "error");
    }
  };

  const handleDemote = async (userId: string, role: string) => {
    try {
      console.log(userId, role);
      await demoteUser(userId, role);
      addToast(`User demoted from ${role} successfully`, "success");
    } catch (error) {
      addToast("Failed to demote user", "error");
    }
  };

  return (
    <div className="overflow-x-auto scroll-hide">
      <table className="min-w-full border-collapse border border-slate-700">
        <thead>
          <tr className="bg-slate-800 text-primaryHover">
            <th className="px-4 py-2 border border-slate-700 text-left">Name</th>
            <th className="px-4 py-2 border border-slate-700 text-left">Email</th>
            <th className="px-4 py-2 border border-slate-700 text-left">Role</th>
            <th className="px-4 py-2 border border-slate-700 text-left">Contributions</th>
            <th className="px-4 py-2 border border-slate-700 text-left">Joined</th>
            <th className="px-4 py-2 border border-slate-700 text-center">Actions</th>
          </tr>
        </thead>
        <tbody>
          {data.map((user, idx) => (
            <tr key={idx} className="odd:bg-slate-700 even:bg-slate-800 text-white">
              <td className="px-4 py-2 border border-slate-700">{user.name}</td>
              <td className="px-4 py-2 border border-slate-700">{user.email}</td>
              <td className="px-4 py-2 border border-slate-700">
                {user.roles.map((role, idx) => (
                  <RoleBadge key={idx} role={role} />
                ))}
              </td>
              <td className="px-4 py-2 border border-slate-700">
                {user.contributions.length}
              </td>
              <td className="px-4 py-2 border border-slate-700">
                {formatDate(user.joinedAt.seconds)}
              </td>
              <td className="px-4 py-2 border border-slate-700 text-center">
                <UserActions
                  onPromote={() => handlePromote(user.id, "member")}
                  onDemote={() => handleDemote(user.id, "member")}
                />
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default Table;
