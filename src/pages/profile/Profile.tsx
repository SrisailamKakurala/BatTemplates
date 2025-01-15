import React, { useEffect, useState } from "react";
import { FiEdit } from "react-icons/fi";
import { getAuthStorage } from "@/utils/localStorageUtil";

const Profile: React.FC = () => {
  const [user, setUser] = useState<any>(null);

  useEffect(() => {
    const authData = getAuthStorage();
    if (authData?.state?.isAuthenticated) {
      setUser(authData.state.user);
    }
  }, []);

  const [activeTab, setActiveTab] = useState<"contributions" | "bookmarks">(
    "contributions"
  );

  if (!user) {
    return (
      <div className="flex flex-col items-center justify-center min-h-[80vh] text-white text-center">
        <p className="text-2xl font-semibold">User not logged in</p>
        <p className="text-sm mt-2 text-gray-400">
          Please log in to view your profile.
        </p>
      </div>
    );
  }

  const contributionsFolders =
    user.contributions?.filter((item: any) => item.type === "folder") || [];
  const contributionsTemplates =
    user.contributions?.filter((item: any) => item.type === "template") || [];
  const bookmarksFolders =
    user.bookmarks?.filter((item: any) => item.type === "folder") || [];
  const bookmarksTemplates =
    user.bookmarks?.filter((item: any) => item.type === "template") || [];

  const renderItems = (items: { type: string; id: string }[]) => {
    return items?.length ? (
      <ul className="grid grid-cols-1 sm:grid-cols-2 gap-4">
        {items.map((item, index) => (
          <li
            key={index}
            className="bg-secondary text-white p-4 rounded-lg shadow-lg hover:shadow-xl hover:scale-102 transition-transform duration-300"
          >
            <div className="flex justify-between items-center">
              <span className="font-semibold text-lg">
                {item.type === "folder" ? "📂 Folder" : "📄 Template"}
              </span>
              <span className="text-sm text-gray-400">{item.id}</span>
            </div>
          </li>
        ))}
      </ul>
    ) : (
      <div className="text-gray-400 text-center">No items yet.</div>
    );
  };

  return (
    <div className="relative w-full mx-auto bg-secondary p-6 rounded-lg shadow-lg space-y-8 text-white overflow-y-scroll scroll-hide">
      {/* Edit Profile Button */}
      <div className="absolute top-6 right-6">
        <button className="flex items-center space-x-2 text-primary hover:text-primaryHover font-semibold bg-gray-400 py-2 px-4 rounded-lg shadow-md hover:shadow-lg transition-all">
          <FiEdit className="text-xl" />
          <span>Edit Profile</span>
        </button>
      </div>

      {/* Profile Header */}
      <div className="flex flex-col sm:flex-row items-center sm:space-x-8">
        {/* Profile Avatar */}
        <div className="w-32 h-32 rounded-full overflow-hidden border-4 border-primary bg-gray-600">
          <img
            src={user.photoURL || "https://via.placeholder.com/150"}
            alt="Profile Avatar"
            className="w-full h-full object-cover"
          />
        </div>

        {/* Profile Info */}
        <div className="mt-4 sm:mt-0 space-y-6">
          {/* User Name and Email */}
          <div>
            <h2 className="text-4xl font-bold text-primary">{user.name}</h2>
            <p className="text-lg text-gray-400 mt-2">{user.email}</p>
            <p className="text-lg text-gray-400">{user.location}</p>
          </div>

          {/* Display Join Date */}
          <div className="border-t border-gray-700 pt-4">
            <p className="text-sm text-gray-400">
              <span className="font-semibold text-primary">Joined on:</span>{" "}
              {new Date(user.joinedAt.seconds * 1000).toLocaleDateString("en-US", {
                year: "numeric",
                month: "long",
                day: "numeric",
              })}
            </p>
          </div>

          {/* Display Counts */}
          <div className="flex justify-between items-center space-x-4 bg-gray-800 p-4 rounded-lg shadow-lg">
            <div className="text-center">
              <p className="text-3xl font-bold text-primary">{user.noOfContributions}</p>
              <p className="text-sm text-gray-400">Contributions</p>
            </div>
            <div className="text-center">
              <p className="text-3xl font-bold text-primary">{user.followersCount}</p>
              <p className="text-sm text-gray-400">Followers</p>
            </div>
            <div className="text-center">
              <p className="text-3xl font-bold text-primary">{user.followingCount}</p>
              <p className="text-sm text-gray-400">Following</p>
            </div>
          </div>

          {/* Display Personal Links */}
          {user.personalLinks?.length > 0 && (
            <div className="border-t border-gray-700 pt-4">
              <h4 className="text-lg text-primary font-semibold mb-2">
                Personal Links:
              </h4>
              <ul className="list-disc list-inside space-y-1 text-primary">
                {user.personalLinks.map((link: string, index: number) => (
                  <li key={index}>
                    <a
                      href={link}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="hover:underline"
                    >
                      {link}
                    </a>
                  </li>
                ))}
              </ul>
            </div>
          )}
        </div>


      </div>

      {/* Tabs for Contributions and Bookmarks */}
      <div className="mt-6">
        <div className="flex border-b-[0.1px] border-gray-700">
          <button
            className={`py-3 px-6 text-xl font-semibold ${activeTab === "contributions"
              ? "text-primary border-b-4 border-primary"
              : "text-gray-400 hover:text-primary"
              } transition-all`}
            onClick={() => setActiveTab("contributions")}
          >
            Contributions
          </button>
          <button
            className={`py-3 px-6 text-xl font-semibold ${activeTab === "bookmarks"
              ? "text-primary border-b-4 border-primary"
              : "text-gray-400 hover:text-primary"
              } transition-all`}
            onClick={() => setActiveTab("bookmarks")}
          >
            Bookmarks
          </button>
        </div>

        {/* Tab Content */}
        <div className="mt-6">
          {activeTab === "contributions" ? (
            <div>
              <h3 className="text-2xl text-primary mb-4">Your Contributions</h3>

              {/* Folders */}
              <div className="mb-6">
                <h4 className="text-xl text-white mb-2">
                  Folders{" "}
                  <span className="text-sm text-primary">
                    ({contributionsFolders.length})
                  </span>
                </h4>
                {renderItems(contributionsFolders)}
              </div>

              {/* Templates */}
              <div>
                <h4 className="text-xl text-white mb-2">
                  Templates{" "}
                  <span className="text-sm text-primary">
                    ({contributionsTemplates.length})
                  </span>
                </h4>
                {renderItems(contributionsTemplates)}
              </div>
            </div>
          ) : (
            <div>
              <h3 className="text-2xl text-primary mb-4">Your Bookmarks</h3>

              {/* Folders */}
              <div className="mb-6">
                <h4 className="text-xl text-white mb-2">
                  Folders{" "}
                  <span className="text-sm text-primary">
                    ({bookmarksFolders.length})
                  </span>
                </h4>
                {renderItems(bookmarksFolders)}
              </div>

              {/* Templates */}
              <div>
                <h4 className="text-xl text-white mb-2">
                  Templates{" "}
                  <span className="text-sm text-primary">
                    ({bookmarksTemplates.length})
                  </span>
                </h4>
                {renderItems(bookmarksTemplates)}
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default Profile;
