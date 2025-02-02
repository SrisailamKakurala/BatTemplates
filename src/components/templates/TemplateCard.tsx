import React, { useState } from "react";
import { FaStar, FaBookmark } from "react-icons/fa";
import Button from "@/components/buttons/Button";
import { addBookmark } from "@/firebase/services/templateServices/bookmarkService";
import { toggleLike } from "@/firebase/services/templateServices/likeService";
import useModalStore from "@/store/modalStore";

interface TemplateCardProps {
  id: string;
  title: string;
  description: string;
  likesCount: number;
  techStack: string;
  tags: string;
  category: string;
  githubLink: string;
  isBookmarked?: boolean;
  isLiked?: boolean;
}

const TemplateCard: React.FC<TemplateCardProps> = ({
  id,
  title,
  description,
  likesCount,
  techStack,
  tags,
  category,
  githubLink,
  isBookmarked = false,
  isLiked = false,
}) => {
  const { openModal } = useModalStore();
  const [localIsBookmarked, setLocalIsBookmarked] = useState(isBookmarked);
  const [localIsLiked, setLocalIsLiked] = useState(isLiked);
  const [likes, setLikes] = useState(likesCount);

  // Function to retrieve the user from auth-storage
  const getUser = () => {
    const authStorage = localStorage.getItem("auth-storage");
    return authStorage ? JSON.parse(authStorage)?.state?.user : null;
  };

  const bookMarkHandler = async () => {
    const user = getUser();
    if (user) {
      const userId = user.id;
      try {
        await addBookmark(userId, id);
        setLocalIsBookmarked(true);
      } catch (error) {
        console.error("Failed to add bookmark:", error);
      }
    } else {
      openModal("signin");
    }
  };

  const likeHandler = async () => {
    const user = getUser();
    if (user) {
      const userId = user.id;
      try {
        // Optimistic UI update
        setLocalIsLiked(!localIsLiked);
        setLikes((prev) => (localIsLiked ? prev - 1 : prev + 1));

        // Update Firestore and get the correct likes count
        const updatedLikesCount = await toggleLike(id, userId, localIsLiked);

        // Synchronize likes count with Firestore
        setLikes(updatedLikesCount);
      } catch (error) {
        console.error("Failed to toggle like:", error);
        // Revert optimistic UI update in case of an error
        setLocalIsLiked(localIsLiked);
        setLikes((prev) => (localIsLiked ? prev + 1 : prev - 1));
      }
    } else {
      openModal("signin");
    }
  };

  const viewHandler = async () => {
    const user = getUser();
    if (user) {
      window.open(githubLink, "_blank");
    } else {
      openModal("signin");
    }
  };

  return (
    <div className="p-6 h-auto max-h-80 min-h-60 rounded shadow hover:shadow-lg bg-secondary hover:bg-secondaryHover cursor-pointer">
      <div className="flex justify-between items-center mb-4">
        <h2 className="md:text-2xl text-xl font-bold text-primary">{title}</h2>
        <div
          className={`text-sm flex gap-1 cursor-pointer ${
            localIsLiked ? "text-yellow-400" : "text-white"
          }`}
          onClick={likeHandler}
        >
          <FaStar size={18} />
          {likes || 0}
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
            }`}
            onClick={bookMarkHandler}
          />
          <Button
            onClick={viewHandler}
            label="View"
            className="bg-primary hover:bg-primaryHover text-white text-md py-1"
          />
        </div>
      </div>
    </div>
  );
};

export default TemplateCard;
