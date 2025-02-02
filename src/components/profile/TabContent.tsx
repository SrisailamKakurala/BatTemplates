import React, { useEffect, useState } from "react";
import TemplateCard from "@/components/templates/TemplateCard";
import { fetchTemplatesByIds } from "@/firebase/services/templateServices/fetchTemplates";
import { fetchFoldersByIds } from "@/firebase/services/folderServices/fetchFolders";

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
        const folderIds = items.filter((item) => item.type === "folder").map((item) => item.id);

        const [fetchedTemplates, fetchedFolders] = await Promise.all([
          fetchTemplatesByIds(templateIds),
          fetchFoldersByIds(folderIds),
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
            <li
              key={folder.id}
              className="bg-secondary text-white p-4 rounded-lg shadow-lg hover:shadow-xl hover:scale-102 transition-transform duration-300"
            >
              <div className="flex justify-between items-center">
                <span className="font-semibold text-lg">📂 {folder.name}</span>
                <span className="text-sm text-gray-400">{folder.id}</span>
              </div>
            </li>
          ))}
        </div>
      )}
    </div>
  );
};

export default TabContent;
