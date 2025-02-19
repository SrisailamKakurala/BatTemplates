import React, { useEffect, useState } from "react";
import { FaAccusoft } from "react-icons/fa";
import Tabs from "@/components/tabs/ButtonTabs";
import TemplateCard from "@/components/cards/TemplateCard";
import { fetchPendingFolders } from "@/firebase/services/adminServices/folder.service";
import { fetchPendingTemplates } from "@/firebase/services/adminServices/template.sevice";
import StructureCard from "@/components/cards/StructureCard";

const AdminDashboard: React.FC = () => {
  const [activeTab, setActiveTab] = useState<"folders" | "templates">("folders");
  const [folders, setFolders] = useState<any[]>([]);
  const [templates, setTemplates] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState("");

  useEffect(() => {
    const fetchData = async () => {
      setLoading(true);
      try {
        let data: any[] = [];

        if (activeTab === "folders") {
          // Fetch pending folders
          data = await fetchPendingFolders();
          console.log("folders: ", data);
          setFolders(data);
        } else {
          // Fetch pending templates
          data = await fetchPendingTemplates();
          console.log("templates: ", data);

          // Check if approved templates are already stored in localStorage
          const storedTemplates = localStorage.getItem("approvedTemplates");
          if (storedTemplates) {
            const approvedTemplates = JSON.parse(storedTemplates);
            // Combine pending and approved templates
            data = data.concat(approvedTemplates);
          } else {
            // Fetch approved templates and store them in localStorage
            // Since we are not fetching history templates anymore, this will be omitted
            // If you still want to store them in localStorage, do that manually as needed
          }
          console.log(data)
          setTemplates(data);
        }

        // Filter data based on search term
        if (searchTerm) {
          data = data.filter((item) =>
            item.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
            item.description.toLowerCase().includes(searchTerm.toLowerCase()) ||
            item.author.toLowerCase().includes(searchTerm.toLowerCase())
          );
        }

        // Set final filtered data to state
        if (activeTab === "folders") {
          setFolders(data);
        } else {
          setTemplates(data);
        }
      } catch (error) {
        console.error("Error loading data:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, [activeTab, searchTerm]);

  return (
    <div className="p-4 sm:p-6 w-full lg:p-8 bg-primaryBg text-white min-h-screen ">
      {/* Heading */}
      <h1 className="text-3xl sm:text-4xl lg:text-5xl font-extrabold md:mb-6 mb-3 flex items-center justify-center sm:justify-start text-primary text-center">
        <span className="mr-3">{<FaAccusoft />}</span> Admin Panel
      </h1>

      {/* Search */}
      <div className="w-full flex justify-center sm:justify-start">
        <input
          type="text"
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          placeholder="Search by name, description, or author..."
          className="w-full sm:w-3/4 lg:w-1/2 px-4 py-2 rounded-md bg-gray-800 text-gray-200 placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500 my-4"
        />
      </div>

      {/* Tabs */}
      <Tabs activeTab={activeTab} setActiveTab={setActiveTab} classNames="mb-6" />

      {/* Content */}
      {loading ? (
        <div className="text-center text-gray-300 text-lg sm:text-xl">Loading...</div>
      ) : (
        <div className="grid gap-4">
          {activeTab === "folders"
            ? folders?.map((folder) => (<StructureCard key={folder.id} {...folder} />))
            : templates?.map((template) => (<TemplateCard key={template.id} {...template} />))}
        </div>
      )}


    </div>
  );
};

export default AdminDashboard;
