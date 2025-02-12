import React from "react";
import { useNavigate } from "react-router-dom";
import UploadFile from "@/components/folders/UploadFile";


const Folders: React.FC = () => {
  const navigate = useNavigate();
  return (
    <div className="flex flex-col items-center justify-center h-full text-white p-6 space-y-4 text-center">
      <UploadFile />
    </div>
  );
};

// const Folders: React.FC = () => {
//   const navigate = useNavigate();
//   return (
//     <div className="flex flex-col items-center justify-center h-full text-white p-6 space-y-4 text-center">
//       <h1 className="text-3xl font-bold text-primary">Coming Soon!</h1>
//       <p className="text-lg text-gray-300">
//         The <span className="text-primary">Folders</span> feature is under development and will be available in the future. Stay tuned!
//       </p>
//       <button onClick={() => navigate("/")} className="mt-4 px-6 py-2 bg-primary hover:bg-primary/90 text-white rounded-lg shadow transition-transform transform hover:scale-105">
//         Back to Home
//       </button>
//     </div>
//   );
// };

export default Folders;
