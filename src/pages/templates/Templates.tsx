import React, { useEffect, useState } from "react";
import { FaRecycle, FaPlus } from "react-icons/fa";
import Search from "@/components/search/Search";
import Button from "@/components/buttons/Button";
import TemplateCard from "@/components/templates/TemplateCard";

const Templates: React.FC = () => {
  const [templates, setTemplates] = useState([]); // Original templates
  const [filteredTemplates, setFilteredTemplates] = useState([]); // Filtered templates

  useEffect(() => {
    const templatesLocal = JSON.parse(localStorage.getItem("templates") || "[]");
    setTemplates(templatesLocal);
    setFilteredTemplates(templatesLocal); // Initialize filtered templates
  }, []);

  const template = {
    title: "React Project Template",
    description: "A simple boilerplate for a React application with hooks and state management.",
    likes: 120,
    techStack: "React, Redux, Axios, Tailwind CSS",
    tags: "React, Redux, Frontend, Tailwind, JavaScript",
    category: "Frontend Development",
    id: "react-frontend-01",
  };
  

  return (
    <div className="w-full h-full px-8 py-4 bg-primaryBg overflow-y-scroll scroll-hide">
      {/* Header */}
      <div className="flex justify-between items-center gap-4 mb-12">
        <div className="flex gap-2 items-center text-4xl font-extrabold text-primary">
          <FaRecycle />
          <h1>Templates</h1>
        </div>

        {/* Search and Button */}
        <div className="flex items-center gap-3 w-full max-w-sm">
          <Search
            placeholder="Search templates..."
            page="templates"
            data={templates}
            onFilter={(data) => setFilteredTemplates(data)} // Update filtered state
          />

          <Button
            label="Contribute"
            onClick={() => {}}
            icon={<FaPlus />}
            className="bg-primary text-white text-md py-2"
          />
        </div>
      </div>

      {/* Templates Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 mt-6">
        <TemplateCard
          title={template.title}
          description={template.description}
          likes={template.likes}
          techStack={template.techStack}
          tags={template.tags}
          category={template.category}
          id={template.id}
        />
        <TemplateCard
          title={template.title}
          description={template.description}
          likes={template.likes}
          techStack={template.techStack}
          tags={template.tags}
          category={template.category}
          id={template.id}
        />
      </div>
    </div>
  );
};

export default Templates;
