import React, { useEffect, useState } from "react";
import { FaRecycle, FaPlus } from "react-icons/fa";
import Search from "@/components/search/Search";
import Button from "@/components/buttons/Button";
import TemplateCard from "@/components/templates/TemplateCard";
import useModalStore from "@/store/modalStore";
import TemplateForm from "@/components/templates/TemplateForm";
import { fetchApprovedTemplates } from "@/firebase/services/templateServices/fetchTemplates";
import { Template } from "@/constants/schema";

const Templates: React.FC = () => {
  const [templates, setTemplates] = useState<Template[]>([]);
  const [filteredTemplates, setFilteredTemplates] = useState<Template[]>([]);
  const [formVisible, setFormVisible] = useState(false);

  const { openModal } = useModalStore(); // Accessing the modal store

  useEffect(() => {
    const fetchTemplates = async () => {
      try {
        // Fetch approved templates
        const approvedTemplates = await fetchApprovedTemplates();
        setTemplates(approvedTemplates);
        setFilteredTemplates(approvedTemplates);

        // Store in localStorage
        localStorage.setItem("templates", JSON.stringify(approvedTemplates));
      } catch (error) {
        console.error("Failed to fetch templates:", error);
      }
    };

    fetchTemplates();
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
    return <TemplateForm setFormVisible={setFormVisible} />;
  }

  return (
    <div className="h-full w-full bg-primaryBg px-4 lg:px-8 py-6 overflow-y-scroll scroll-hide">
      {/* Header */}
      <div className="flex flex-col lg:flex-row justify-between items-center gap-6 mb-8">
        <div className="flex items-center gap-2 text-primary text-2xl md:text-3xl font-bold">
          <FaRecycle />
          <h1>Templates</h1>
        </div>

        {/* Search and Button */}
        <div className="flex flex-col sm:flex-row items-center gap-4 w-full lg:w-auto">
          <Search
            placeholder="Search templates..."
            page="templates"
            data={templates}
            onFilter={(data) => setFilteredTemplates(data)} // Update filtered state
          />
          <Button
            label="Contribute"
            onClick={handleOnclick}
            icon={<FaPlus />}
            className="bg-primary text-white text-sm md:text-md px-4 py-2"
          />
        </div>
      </div>

      {/* Templates Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
        {filteredTemplates.map((template) => (
          <TemplateCard
            key={template.id}
            title={template.title}
            description={template.description}
            likes={template.likes}
            techStack={template.techStack}
            tags={template.tags}
            category={template.category}
            id={template.id}
            githubLink={template.githubLink}
          />
        ))}
      </div>
    </div>
  );
};

export default Templates;
