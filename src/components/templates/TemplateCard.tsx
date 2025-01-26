import React, { useState } from "react";
import { FaStar, FaBookmark } from "react-icons/fa";
import Button from "@/components/buttons/Button";
import { addBookmark } from "@/firebase/services/templateServices/bookmarkService"; // Import the bookmark service
import useModalStore from "@/store/modalStore";

interface TemplateCardProps {
  id: string;
  title: string;
  description: string;
  likes: number;
  techStack: string;
  tags: string;
  category: string;
  githubLink: string;
  isBookmarked?: boolean; // Add isBookmarked prop
}

const TemplateCard: React.FC<TemplateCardProps> = ({
  id,
  title,
  description,
  likes,
  techStack,
  tags,
  category,
  githubLink,
  isBookmarked = false, // Default to false if not provided
}) => {
  const { openModal } = useModalStore();
  const [localIsBookmarked, setLocalIsBookmarked] = useState(isBookmarked); // Local state for bookmark status

  const bookMarkHandler = async () => {
    const authStorage = localStorage.getItem("auth-storage");
    const authStatus = authStorage ? JSON.parse(authStorage) : null;

    if (authStatus?.state.isAuthenticated) {
      const userId = authStatus.state.user?.id;
      if (userId) {
        try {
          await addBookmark(userId, id); // Call the bookmark service
          setLocalIsBookmarked(true); // Update local state to indicate bookmark is added
        } catch (error) {
          console.error("Failed to add bookmark:", error);
        }
      } else {
        console.error("User ID is missing in local storage.");
      }
    } else {
      openModal("signin"); // Open the SignIn modal if not authenticated
    }
  };

  return (
    <div className="p-6 h-auto max-h-80 min-h-60 rounded shadow hover:shadow-lg bg-secondary hover:bg-secondaryHover cursor-pointer">
      <div className="flex justify-between items-center mb-4">
        <h2 className="md:text-2xl text-xl font-bold text-primary">{title}</h2>
        <div className="text-sm flex gap-1 text-primary">
          <span>
            <FaStar size={18} fill="#FFD700" />
          </span>{" "}
          {likes}
        </div>
      </div>

      <p className="text-slate-300 text-sm mt-2">{description}</p>

      <p className="text-slate-300 text-xs my-2">
        <span className="text-primary">Tech</span>: {techStack}
      </p>

      <p className="text-slate-300 text-xs my-2">
        <span className="text-primary">Tags</span>: {tags}
      </p>

      <div className="flex items-center justify-between mt-5">
        <p className="text-primary text-lg my-2 font-semibold">{category}</p>

        <div className="flex gap-2 items-center">
          <FaBookmark
            size={30}
            className={`cursor-pointer ${
              localIsBookmarked ? "text-yellow-400" : "text-white"
            }`} // Change color based on bookmark state
            onClick={bookMarkHandler}
          />
          <Button
            onClick={() => {
              window.open(githubLink, "_blank");
            }}
            label="View"
            className="bg-primary hover:bg-primaryHover text-white text-md py-1"
          />
        </div>
      </div>
    </div>
  );
};

export default TemplateCard;