import React, { useEffect, useState } from "react";
import { FaRecycle, FaPlus } from "react-icons/fa";
import Search from "@/components/search/Search";
import Button from "@/components/buttons/Button";
import TemplateCard from "@/components/templates/TemplateCard";
import useModalStore from "@/store/modalStore";
import TemplateForm from "@/components/templates/TemplateForm";

const Templates: React.FC = () => {
  const [templates, setTemplates] = useState([]);
  const [filteredTemplates, setFilteredTemplates] = useState([]);
  const [formVisible, setFormVisible] = useState(false);

  const { openModal } = useModalStore(); // Accessing the modal store

  useEffect(() => {
    const templatesLocal = JSON.parse(localStorage.getItem("templates") || "[]");
    setTemplates(templatesLocal);
    setFilteredTemplates(templatesLocal); // Initialize filtered templates
  }, []);

  // Sample template data
  const template = {
    title: "React Project Template",
    description: "A simple boilerplate for a React application with hooks and state management.",
    likes: 120,
    techStack: "React, Redux, Axios, Tailwind CSS",
    tags: "React, Redux, Frontend, Tailwind, JavaScript",
    category: "Frontend Development",
    id: "react-frontend-01",
  };

  const handleOnclick = () => {
    const authStorage = localStorage.getItem("auth-storage");

    // Parse the auth data
    const authStatus = authStorage ? JSON.parse(authStorage) : null;

    if (authStatus?.state.isAuthenticated) {
      setFormVisible(true)
    } else {
      openModal("signin"); // Open the SignIn modal
    }
  };

  if(formVisible) {
    return <TemplateForm setFormVisible={setFormVisible} />
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
            onClick={handleOnclick} // Use the updated handleOnclick function
            icon={<FaPlus />}
            className="bg-primary text-white text-sm md:text-md px-4 py-2"
          />
        </div>
      </div>

      {/* Templates Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
        {/* Using sample data three times */}
        {[...Array(3)].map((_, index) => (
          <TemplateCard
            key={index}
            title={template.title}
            description={template.description}
            likes={template.likes}
            techStack={template.techStack}
            tags={template.tags}
            category={template.category}
            id={template.id}
          />
        ))}
      </div>
    </div>
  );
};

export default Templates;
