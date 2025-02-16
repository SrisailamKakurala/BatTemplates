import Button from "@/components/buttons/Button";
import Search from "@/components/search/Search";
import { userFolderProps } from "@/constants/interfaces";
import React, { useState, useEffect } from "react";
import { FaFolderOpen, FaPlus } from "react-icons/fa";
import useModalStore from "@/store/modalStore";
import { fetchPendingFolders } from "@/firebase/services/folderServices/fetchFolders";
import StructuresForm from "@/components/folders/StructuresForm";


const Folders: React.FC = () => {
  const { openModal } = useModalStore(); // Accessing the modal store
  const [structures, setStructures] = useState<userFolderProps[]>([]);
  const [filteredStructures, setFilteredStructures] = useState<userFolderProps[]>([]);
  const [loading, setLoading] = useState(true); // Track loading state
  const [formVisible, setFormVisible] = useState(false);
  

  useEffect(() => {
      const fetchStructures = async () => {
        try {
          // Fetch approved templates
          const approvedTemplates = await fetchPendingFolders();
          setStructures(approvedTemplates);
          setFilteredStructures(approvedTemplates);
          console.log(filteredStructures, loading);
        } catch (error) {
          console.error("Failed to fetch templates:", error);
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
      {/* {loading ? (
        <SkeletonGrid count={9} height="h-40" width="w-full" />
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredTemplates.map((template) => (
            <TemplateCard
              key={template.id}
              id={template.id}
              title={template.title}
              description={template.description}
              likesCount={template.likes?.length}
              techStack={template.techStack}
              tags={template.tags}
              category={template.category}
              githubLink={template.githubLink}
              authorId={template.authorId}
            />
          ))}
        </div>
      )} */}
    </div>
  );
};

// const Folders: React.FC = () => {
//   const navigate = useNavigate();
//   return (
//     <div className="flex flex-col items-center justify-center h-full text-white p-6 space-y-4 text-center">
//       <h1 className="text-3xl font-bold text-primary">Coming Soon!</h1>
//       <p className="text-lg text-gray-300">
//         The <span className="text-primary">Folders</span> feature is under development and will be available in the future. Stay tuned!
//       </p>
//       <button onClick={() => navigate("/")} className="mt-4 px-6 py-2 bg-primary hover:bg-primary/90 text-white rounded-lg shadow transition-transform transform hover:scale-105">
//         Back to Home
//       </button>
//     </div>
//   );
// };

export default Folders;
