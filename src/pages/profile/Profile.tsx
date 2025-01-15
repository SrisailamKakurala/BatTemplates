import React, { useState } from "react";
import { FiEdit } from "react-icons/fi";
import useUserStore from "@/store/userStore"; // Default import for zustand store

const Profile: React.FC = () => {
  const { user } = useUserStore(); // Get user data from Zustand store
  const [activeTab, setActiveTab] = useState<'contributions' | 'bookmarks'>('contributions');

  if (!user) {
    return <div className="text-white text-center">Loading...</div>; // Handle case when user is not available
  }

  const contributionsFolders = user.contributions?.filter(item => item.type === 'folder') || [];
  const contributionsTemplates = user.contributions?.filter(item => item.type === 'template') || [];
  const bookmarksFolders = user.bookmarks?.filter(item => item.type === 'folder') || [];
  const bookmarksTemplates = user.bookmarks?.filter(item => item.type === 'template') || [];

  const renderItems = (items: { type: string, id: string }[]) => {
    return items?.length ? (
      <ul className="space-y-4">
        {items.map((item, index) => (
          <li key={index} className="bg-secondary text-white p-4 rounded-lg shadow-lg hover:shadow-xl transition-all duration-300">
            <div className="flex justify-between items-center">
              <span className="font-semibold">{item.type === 'folder' ? 'Folder' : 'Template'}</span>
              <span className="text-sm text-primary">{item.id}</span>
            </div>
          </li>
        ))}
      </ul>
    ) : (
      <div className="bg-secondary text-white p-4 rounded-lg shadow-md">
        No items yet.
      </div>
    );
  };

  return (
    <div className="max-w-4xl mx-auto bg-primaryBg p-6 rounded-lg shadow-lg space-y-8">
      {/* Profile Header */}
      <div className="flex flex-col sm:flex-row items-center sm:space-x-6">
        {/* Profile Avatar */}
        <div className="w-28 h-28 rounded-full overflow-hidden border-4 border-primary bg-gray-600">
          <img src={user.photoURL || 'default-avatar.png'} alt="Profile Avatar" className="w-full h-full object-cover" />
        </div>

        {/* Profile Info */}
        <div className="text-white mt-4 sm:mt-0">
          <h2 className="text-3xl font-bold text-primary">{user.name}</h2>
          <p className="text-lg text-whiteText">{user.email}</p>
          <div className="flex space-x-4 mt-2 flex-wrap">
            {user.roles?.map((role: string, index: number) => (
              <span key={index} className="bg-primary text-white px-4 py-1 rounded-full text-sm">{role}</span>
            ))}
          </div>
        </div>
      </div>

      {/* Edit Profile Button */}
      <div className="flex justify-end">
        <button className="flex items-center space-x-2 text-primary hover:text-primaryHover font-semibold">
          <FiEdit className="text-xl" />
          <span>Edit Profile</span>
        </button>
      </div>

      {/* Tabs for Contributions and Bookmarks */}
      <div className="mt-6">
        <div className="flex justify-start">
          <button
            className={`py-2 px-6 text-xl font-semibold text-white hover:text-primary focus:outline-none transition-all duration-300 ${activeTab === 'contributions' ? 'border-b-4 border-primary' : ''}`}
            onClick={() => setActiveTab('contributions')}
          >
            Contributions
          </button>
          <button
            className={`py-2 px-6 text-xl font-semibold text-white hover:text-primary focus:outline-none transition-all duration-300 ${activeTab === 'bookmarks' ? 'border-b-4 border-primary' : ''}`}
            onClick={() => setActiveTab('bookmarks')}
          >
            Bookmarks
          </button>
        </div>

        {/* Tab Content */}
        <div className="mt-6">
          {activeTab === 'contributions' ? (
            <div>
              <h3 className="text-2xl text-primary mb-4">Contributions</h3>

              {/* Folders */}
              <div className="mb-4">
                <h4 className="text-xl text-white mb-2">Folders <span className="text-sm text-primary">({contributionsFolders.length})</span></h4>
                {renderItems(contributionsFolders)}
              </div>

              {/* Templates */}
              <div>
                <h4 className="text-xl text-white mb-2">Templates <span className="text-sm text-primary">({contributionsTemplates.length})</span></h4>
                {renderItems(contributionsTemplates)}
              </div>
            </div>
          ) : (
            <div>
              <h3 className="text-2xl text-primary mb-4">Bookmarks</h3>

              {/* Folders */}
              <div className="mb-4">
                <h4 className="text-xl text-white mb-2">Folders <span className="text-sm text-primary">({bookmarksFolders.length})</span></h4>
                {renderItems(bookmarksFolders)}
              </div>

              {/* Templates */}
              <div>
                <h4 className="text-xl text-white mb-2">Templates <span className="text-sm text-primary">({bookmarksTemplates.length})</span></h4>
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
