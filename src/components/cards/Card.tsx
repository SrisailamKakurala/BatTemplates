import React from "react";

const Card: React.FC<{
  title: string;
  author: string;
  date: string;
  description: string;
  type: string;
}> = ({ title, author, date, description, type }) => {
  return (
    <div className="bg-secondaryBg p-4 rounded-md shadow-md mb-4 flex flex-col sm:flex-row justify-between">
      <div>
        <h3 className="text-lg font-bold text-primary">{title}</h3>
        <p className="text-sm text-gray-400">
          Submitted by {author} on {new Date(date).toLocaleDateString()}
        </p>
        <p className="text-sm text-gray-300 mt-2">{description}</p>
      </div>
      <div className="flex items-center mt-4 sm:mt-0">
        <button className="bg-green-500 text-white px-4 py-2 rounded-md mr-2 hover:bg-green-600">
          Approve
        </button>
        <button className="bg-red-500 text-white px-4 py-2 rounded-md hover:bg-red-600">
          Reject
        </button>
      </div>
      <span
        className={`text-xs uppercase px-2 py-1 rounded-full mt-4 sm:mt-0 sm:ml-4 ${
          type === "folder" ? "bg-blue-500" : "bg-yellow-500"
        } text-white`}
      >
        {type}
      </span>
    </div>
  );
};

export default Card;
