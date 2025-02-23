import Button from "@/components/buttons/Button";
import Search from "@/components/search/Search";
import { Folder } from "@/constants/schema";
import React, { useState, useEffect } from "react";
import { FaFolderOpen, FaPlus } from "react-icons/fa";
import useModalStore from "@/store/modalStore";
import { fetchApprovedFolders } from "@/firebase/services/folderServices/fetchFolders";
import StructuresForm from "@/components/folders/StructuresForm";
import SkeletonGrid from "@/components/skeletons/SkeletonGrid";
import StructureCard from "@/components/folders/StructureCard";


const Folders: React.FC = () => {
  const { openModal } = useModalStore(); // Accessing the modal store
  const [structures, setStructures] = useState<Folder[]>([]);
  const [filteredStructures, setFilteredStructures] = useState<Folder[]>([]);
  const [loading, setLoading] = useState(true); // Track loading state
  const [formVisible, setFormVisible] = useState(false);


  useEffect(() => {
    const fetchStructures = async () => {
      try {
        // Fetch approved folder structures
        const approvedStructures = await fetchApprovedFolders();
        setStructures(approvedStructures);
        setFilteredStructures(approvedStructures);
        console.log(filteredStructures);
      } catch (error) {
        console.error("Failed to fetch Structures:", error);
      } finally {
        setLoading(false); // Set loading to false after fetching
      }
    };

    fetchStructures();
  }, []);

  const handleOnclick = () => {
    const authStorage = localStorage.getItem("auth-storage");

    // Parse the auth data
    const authStatus = authStorage ? JSON.parse(authStorage) : null;

    if (authStatus?.state.isAuthenticated) {
      setFormVisible(true);
    } else {
      openModal("signin"); // Open the SignIn modal
    }
  };

  if (formVisible) {
    return <StructuresForm setFormVisible={setFormVisible} />;
  }

  return (
    <div className="h-full w-full bg-primaryBg px-4 lg:px-8 py-6 overflow-y-scroll scroll-hide">
      {/* Header */}
      <div className="flex flex-col lg:flex-row justify-between items-center gap-6 mb-8">
        <div className="flex items-center gap-2 text-primary text-2xl md:text-3xl font-bold">
          <FaFolderOpen />
          <h1>Folder Structures</h1>
        </div>

        {/* Search and Button */}
        <div className="flex flex-col sm:flex-row items-center gap-4 w-full lg:w-auto">
          <Search
            placeholder="Search structures..."
            page="templates"
            data={structures}
            onFilter={(data) => setFilteredStructures(data)} // Update filtered state
          />
          <Button
            label="Contribute"
            onClick={handleOnclick}
            icon={<FaPlus />}
            className="bg-primary text-white text-sm md:text-md px-4 py-2"
          />
        </div>
      </div>

      {/* Folders Grid */}
      {loading ? (
        <SkeletonGrid count={3} height="h-[70vh]" width="w-full" />
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredStructures.map((folder) => (
            <StructureCard key={folder.id} folder={folder} />
          ))}
        </div>
      )}
    </div>
  );
};

export default Folders;
