import React, { useEffect, useState } from "react";
import Tabs from "@/components/tabs/ButtonTabs";
import TemplateCard from "@/components/templates/TemplateCard";
import { fetchBookmarks } from "@/firebase/services/bookmarkServices/fetchBookmarks.service";
import { FaBookmark } from "react-icons/fa";
import CircularLoader from "@/components/loaders/CircularLoader";
import StructureCard from "@/components/folders/StructureCard";

const Bookmarks: React.FC = () => {
  const [activeTab, setActiveTab] = useState<"folders" | "templates">("folders");
  const [folders, setFolders] = useState<any[]>([]); // Replace `any` with your folder type
  const [templates, setTemplates] = useState<any[]>([]); // Replace `any` with your template type
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchBookmarksData = async () => {
      const authStorage = localStorage.getItem("auth-storage");
      const authStatus = authStorage ? JSON.parse(authStorage) : null;
      const userId = authStatus?.state.user?.id;

      if (userId) {
        try {
          const { bookmarkedTemplates, bookmarkedStructures } = await fetchBookmarks(userId);
          console.log("bookmarkedTemplates", bookmarkedTemplates);
          setFolders(bookmarkedStructures);
          setTemplates(bookmarkedTemplates);
        } catch (error) {
          console.error("Failed to fetch bookmarks:", error);
        } finally {
          setLoading(false);
        }
      } else {
        console.error("User ID is missing in local storage.");
        setLoading(false);
      }
    };

    fetchBookmarksData();
  }, []);

  if (loading) {
    return <CircularLoader />;
  }

  return (
    <div className="h-full w-full bg-primaryBg px-4 lg:px-8 py-6 overflow-y-scroll scroll-hide">
      {/* Header */}
      <div className="flex items-center gap-2 text-primary text-2xl md:text-3xl font-bold mb-8">
        <FaBookmark />
        <h1>Bookmarks</h1>
      </div>

      {/* Tabs */}
      <Tabs activeTab={activeTab} setActiveTab={setActiveTab} />

      {/* Content */}
      {activeTab === "folders" ? (
        <div>
          {folders.length > 0 ? (
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
              {folders.map((folder) => (
                <StructureCard key={folder.id} folder={folder} />
              ))}
            </div>
          ) : (
            <p className="text-slate-300">No bookmarked folders found.</p>
          )}
        </div>
      ) : (
        <div>
          {templates.length > 0 ? (
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
              {templates.map((template) => (
                <TemplateCard
                  key={template.id}
                  id={template.id}
                  title={template.title}
                  description={template.description}
                  likesCount={template.likes?.length || 0}
                  techStack={template.techStack}
                  tags={template.tags}
                  category={template.category}
                  githubLink={template.githubLink}
                  isBookmarked={true}
                  authorId={template.authorId}
                />
              ))}
            </div>
          ) : (
            <p className="text-slate-300">No bookmarked templates found.</p>
          )}
        </div>
      )}
    </div>
  );
};

export default Bookmarks;