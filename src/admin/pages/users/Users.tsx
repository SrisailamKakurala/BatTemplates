import React, { useEffect, useState } from "react";
import { FaUserShield } from "react-icons/fa";
import { fetchUsersFromFirestore } from "@/firebase/services/adminServices/userService.service";
import Table from "@/components/tableComponents/Table";
import Search from "@/components/search/Search";

const Users: React.FC = () => {
  const [users, setUsers] = useState<any[]>([]);
  const [filteredUsers, setFilteredUsers] = useState<any[]>([]); // For filtered data

  useEffect(() => {
    const fetchAndSetUsers = async () => {
      try {
        const usersData = await fetchUsersFromFirestore();
        // console.log(usersData);
        // localStorage.setItem("users", JSON.stringify(usersData));
        setUsers(usersData);
        setFilteredUsers(usersData); // Initialize with full data
      } catch (error) {
        console.error("Error fetching users:", error);
      }
    };

    fetchAndSetUsers();
  }, []);

  const handleFilter = (filteredData: any[]) => {
    setFilteredUsers(filteredData);
  };

  return (
    <div className="w-full min-h-screen px-4 sm:px-8 py-4 bg-primaryBg">
      {/* Header */}
      <div className="flex flex-wrap sm:flex-nowrap justify-between items-center mb-8">
        <div className="flex items-center gap-2 text-3xl sm:text-4xl font-extrabold text-primary">
          <FaUserShield />
          <h1 className="leading-none">User Management</h1>
        </div>
        <div className="w-full sm:w-80 mt-4 sm:mt-0">
          <Search
            placeholder="Search users..."
            page="folders"
            data={users} // Pass full user data for filtering
            onFilter={handleFilter} // Update filtered data
          />
        </div>
      </div>

      {/* Table */}
      <div className="overflow-x-auto scroll-hide rounded-lg shadow-md">
        <Table data={filteredUsers} />
      </div>
    </div>
  );
};

export default Users;
