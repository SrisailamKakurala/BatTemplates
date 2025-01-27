import React, { useEffect, useState } from "react";
import Tabs from "@/components/tabs/ButtonTabs";
import TemplateCard from "@/components/templates/TemplateCard";
import { fetchBookmarks } from "@/firebase/services/bookmarkServices/fetchBookmarks";
import { FaBookmark } from "react-icons/fa";

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
          const { bookmarkedTemplates, bookmarkedFolders } = await fetchBookmarks(userId);
          console.log("bookmarkedTemplates", bookmarkedTemplates);
          setFolders(bookmarkedFolders);
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
    return <div>Loading...</div>;
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
                <div
                  key={folder.id}
                  className="p-6 rounded shadow bg-secondary hover:bg-secondaryHover cursor-pointer"
                >
                  <h3 className="text-xl font-bold text-primary">{folder.name}</h3>
                  <p className="text-slate-300 text-sm mt-2">{folder.description}</p>
                </div>
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
                  likes={template.likes}
                  techStack={template.techStack}
                  tags={template.tags}
                  category={template.category}
                  githubLink={template.githubLink}
                  isBookmarked={true} // Set isBookmarked to true for all templates
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