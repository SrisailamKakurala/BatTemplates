import React from "react";
import RoleBadge from "@/components/tableComponents/RoleBadge";
import UserActions from "@/components/tableComponents/UserActions";
import formatDate from "@/utils/formatDate";
import { promoteUser } from "@/firebase/services/adminServices/promotion.service";
import { demoteUser } from "@/firebase/services/adminServices/demotion.service";
import { useToast } from "@/hooks/ui/useToast";

interface TableProps {
  data: any[]; // Generic type for data
  type: "users" | "logs"; // A prop to specify the type of data (users or logs)
}

const Table: React.FC<TableProps> = ({ data, type }) => {
  const { addToast } = useToast();

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
            {type === "users" ? (
              <>
                <th className="px-4 py-2 border border-slate-700 text-left">Name</th>
                <th className="px-4 py-2 border border-slate-700 text-left">Email</th>
                <th className="px-4 py-2 border border-slate-700 text-left">Role</th>
                <th className="px-4 py-2 border border-slate-700 text-left">Contributions</th>
                <th className="px-4 py-2 border border-slate-700 text-left">Joined</th>
                <th className="px-4 py-2 border border-slate-700 text-center">Actions</th>
              </>
            ) : (
              <>
                <th className="px-4 py-2 border border-slate-700 text-left">Action</th>
                <th className="px-4 py-2 border border-slate-700 text-left">User</th>
                <th className="px-4 py-2 border border-slate-700 text-left">Roles</th>
                <th className="px-4 py-2 border border-slate-700 text-left">Details</th>
                <th className="px-4 py-2 border border-slate-700 text-left">Timestamp</th>
              </>
            )}
          </tr>
        </thead>
        <tbody>
          {data.map((item, idx) => (
            <tr key={idx} className="odd:bg-slate-700 even:bg-slate-800 text-white">
              {type === "users" ? (
                <>
                  <td className="px-4 py-2 border border-slate-700">{item.name}</td>
                  <td className="px-4 py-2 border border-slate-700">{item.email}</td>
                  <td className="px-4 py-2 border border-slate-700">
                    {item.roles.map((role: string, idx: number) => (
                      <RoleBadge key={idx} role={role} />
                    ))}
                  </td>
                  <td className="px-4 py-2 border border-slate-700">{item.contributions.length}</td>
                  <td className="px-4 py-2 border border-slate-700">{formatDate(item.joinedAt.seconds)}</td>
                  <td className="px-4 py-2 border border-slate-700 text-center">
                    <UserActions
                      onPromote={() => handlePromote(item.id, "member")}
                      onDemote={() => handleDemote(item.id, "member")}
                    />
                  </td>
                </>
              ) : (
                <>
                  <td className="px-4 py-2 border border-slate-700">{item.action}</td>
                  <td className="px-4 py-2 border border-slate-700">{item.userEmail}</td>
                  <td className="px-4 py-2 border border-slate-700">
                    {item.userRoles.map((role: string, idx: number) => (
                      <RoleBadge key={idx} role={role} />
                    ))}
                  </td>
                  <td className="px-4 py-2 border border-slate-700">
                    {item.details.split("\n").map((line: string, idx: number) => (
                      <div key={idx} className="pl-4">{line}</div>
                    ))}
                  </td>
                  <td className="px-4 py-2 border border-slate-700">{formatDate(item.timestamp.seconds)}</td>
                </>

              )}
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default Table;

