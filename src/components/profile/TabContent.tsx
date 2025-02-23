import React, { useEffect, useState } from "react";
import TemplateCard from "@/components/templates/TemplateCard";
import { fetchTemplatesByIds } from "@/firebase/services/templateServices/fetchTemplates.service";
import { fetchFoldersByIds } from "@/firebase/services/folderServices/fetchFolders.service";
import StructureCard from "../folders/StructureCard";

interface TabContentProps {
  title: string;
  items: { type: string; id: string }[];
}

const TabContent: React.FC<TabContentProps> = ({ title, items }) => {
  const [templates, setTemplates] = useState<any[]>([]);
  const [folders, setFolders] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchData = async () => {
      setLoading(true);
      try {
        const templateIds = items.filter((item) => item.type === "template").map((item) => item.id);
        const structureIds = items.filter((item) => item.type === "structure").map((item) => item.id);

        const [fetchedTemplates, fetchedFolders] = await Promise.all([
          fetchTemplatesByIds(templateIds),
          fetchFoldersByIds(structureIds),
        ]);

        setTemplates(fetchedTemplates);
        setFolders(fetchedFolders);
      } catch (error) {
        console.error("Error fetching templates or folders:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, [items]);

  return (
    <div className="mb-6">
      <h4 className="text-xl text-white mb-2">
        {title} <span className="text-sm text-primary">({items.length})</span>
      </h4>

      {loading ? (
        <p className="text-gray-400 text-center">Loading...</p>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 rounded-lg bg-primary md:p-6 p-2">
          {templates.map((template) => (
            <TemplateCard key={template.id} {...template} />
          ))}
          {folders.map((folder) => (
            <StructureCard key={folder.id} folder={folder} />
          ))}
        </div>
      )}
    </div>
  );
};

export default TabContent;
