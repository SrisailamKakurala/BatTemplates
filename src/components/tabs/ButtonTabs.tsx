import React from "react";

interface TabsProps {
  activeTab: "folders" | "templates"; // Explicitly defining type here as well
  setActiveTab: (tab: "folders" | "templates") => void;
  classNames?: string;
}

// Defining the `tabsConfig` with explicit types for `id`
const tabsConfig: { id: "folders" | "templates"; label: string }[] = [
  { id: "folders", label: "Structures" },
  { id: "templates", label: "Templates" },
];

const Tabs: React.FC<TabsProps> = ({ activeTab, setActiveTab, classNames }) => {
  return (
    <div className={`flex space-x-4 mb-6 py-2 ${classNames}`}>
      {tabsConfig.map((tab) => (
        <button
          key={tab.id}
          onClick={() => setActiveTab(tab.id)}
          className={`px-4 py-2 rounded-md text-lg font-semibold ${
            activeTab === tab.id
              ? "bg-primary text-white border-b-2 border-red-500"
              : "bg-gray-800 text-gray-300"
          }`}
        >
          {tab.label}
        </button>
      ))}
    </div>
  );
};

export default Tabs;
