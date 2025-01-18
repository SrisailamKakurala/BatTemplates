import React from "react";

interface TabProps {
  id: "folders" | "templates";
  label: string;
  isActive: boolean;
  onClick: () => void;
}

const Tab: React.FC<TabProps> = ({ id, label, isActive, onClick }) => {
  return (
    <button
      onClick={onClick}
      className={`px-4 py-2 rounded-md text-lg font-semibold ${
        isActive
          ? "bg-primary text-white border-b-2 border-red-500"
          : "bg-gray-800 text-gray-300"
      }`}
    >
      {label}
    </button>
  );
};

interface TextTabsProps {
  activeTab: "folders" | "templates";
  setActiveTab: (tab: "folders" | "templates") => void;
  classNames?: string;
}

const TextTabs: React.FC<TextTabsProps> = ({ activeTab, setActiveTab, classNames }) => {
  const tabsConfig: { id: "folders" | "templates"; label: string }[] = [
    { id: "folders", label: "Folders" },
    { id: "templates", label: "Templates" },
  ];

  return (
    <div className={`flex space-x-4 mb-6 py-2 ${classNames}`}>
      {tabsConfig.map((tab) => (
        <Tab
          key={tab.id}
          id={tab.id}
          label={tab.label}
          isActive={activeTab === tab.id}
          onClick={() => setActiveTab(tab.id)}
        />
      ))}
    </div>
  );
};

export default TextTabs;
