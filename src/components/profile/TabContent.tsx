import React from "react";

interface TabContentProps {
  title: string;
  items: { type: string; id: string }[];
}

const TabContent: React.FC<TabContentProps> = ({ title, items }) => {
  return (
    <div className="mb-6">
      <h4 className="text-xl text-white mb-2">
        {title} <span className="text-sm text-primary">({items.length})</span>
      </h4>
      {items.length ? (
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
      )}
    </div>
  );
};

export default TabContent;
