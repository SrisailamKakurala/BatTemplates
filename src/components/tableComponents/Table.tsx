import React from "react";
import RoleBadge from "@/components/tableComponents/RoleBadge";
import UserActions from "@/components/tableComponents/UserActions";
import formatDate from "@/utils/formatDate";

interface Data {
  name: string;
  email: string;
  roles: string[];
  contributions: any[];
  joinedAt: { seconds: number; nanoseconds: number };
  category: string;
  author: string;
  status: string;
  createdAt: { seconds: number; nanoseconds: number };
  downloads: number;
  action: string;
  details: string;
}

interface TableProps {
  data: Data[];
}

const UserTable: React.FC<Partial<TableProps>> = ({ data = [] }) => {
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
                  onPromote={() => console.log("Promoted", user.name)}
                  onDemote={() => console.log("Demoted", user.name)}
                />
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default UserTable;
