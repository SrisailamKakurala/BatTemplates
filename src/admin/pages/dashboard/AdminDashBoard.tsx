import React, { useEffect, useState } from "react";
import { FaAccusoft } from "react-icons/fa";
import Tabs from "@/components/tabs/ButtonTabs";
import Card from "@/components/cards/Card";
import { fetchPendingFolders, fetchHistoryFolders } from "@/firebase/services/adminServices/folder.service";
import { fetchPendingTemplates, fetchHistoryTemplates } from "@/firebase/services/adminServices/template.sevice";

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
          data = await (await fetchPendingFolders()).concat(await fetchHistoryFolders());
          setFolders(data);
        } else {
          data = await (await fetchPendingTemplates()).concat(await fetchHistoryTemplates());
          setTemplates(data);
        }
        console.log("Data:", data);

        // Filter data based on search term
        if (searchTerm) {
          data = data.filter((item) =>
            item.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
            item.description.toLowerCase().includes(searchTerm.toLowerCase()) ||
            item.author.toLowerCase().includes(searchTerm.toLowerCase())
          );
        }

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
    <div className="p-6 sm:p-8 bg-primaryBg text-white min-h-screen">
      <h1 className="text-4xl font-bold mb-6 flex items-center">
        <span className="text-primary mr-4">{<FaAccusoft />}</span> Admin Panel
      </h1>

      {/* Search */}
      <input
        type="text"
        value={searchTerm}
        onChange={(e) => setSearchTerm(e.target.value)}
        placeholder="Search by name, description, or author..."
        className="w-full sm:w-1/2 px-4 py-2 rounded-md bg-gray-800 text-gray-200 placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500 my-4"
      />

      {/* Tabs */}
      <Tabs activeTab={activeTab} setActiveTab={setActiveTab} classNames="" />

      {/* Content */}
      {loading ? (
        <div className="text-center text-gray-300">Loading...</div>
      ) : (
        <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {(activeTab === "folders" ? folders : templates).map((item) => (
            <Card key={item.id} {...item} />
          ))}
        </div>
      )}
    </div>
  );
};

export default AdminDashboard;
