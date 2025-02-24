import React, { useState } from "react";
import { FaStar, FaBookmark, FaEdit, FaTrash } from "react-icons/fa";
import Button from "@/components/buttons/Button";
import { addBookmark } from "@/firebase/services/templateServices/bookmark.service";
import { toggleLike } from "@/firebase/services/templateServices/like.service";
import useModalStore from "@/store/modalStore";
import EditTemplateForm from "@/components/templates/EditTemplateForm";
import DeleteTemplateModal from "@/components/modals/DeleteModal";
import { viewHandler } from "@/firebase/services/templateServices/viewHandler.service";

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
  authorId: string;
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
  authorId,
}) => {
  
  const { openModal } = useModalStore();
  const [localIsBookmarked, setLocalIsBookmarked] = useState(isBookmarked);
  const [localIsLiked, setLocalIsLiked] = useState(isLiked);
  const [likes, setLikes] = useState(likesCount);
  const [isEditOpen, setIsEditOpen] = useState(false);
  const [isDeleteOpen, setIsDeleteOpen] = useState(false);

  const user = JSON.parse(localStorage.getItem("auth-storage") || "{}")?.state?.user;

  console.log("likes: ", likesCount);

  const bookMarkHandler = async () => {
    if (user) {
      try {
        await addBookmark(user.id, id);
        setLocalIsBookmarked(true);
      } catch (error) {
        console.error("Failed to add bookmark:", error);
      }
    } else {
      openModal("signin");
    }
  };

  const likeHandler = async () => {
    if (user) {
      try {
        setLocalIsLiked(!localIsLiked);
        setLikes((prev) => (localIsLiked ? prev - 1 : prev + 1));
        const updatedLikesCount = await toggleLike(id, user.id, localIsLiked);
        setLikes(updatedLikesCount);
      } catch (error) {
        console.error("Failed to toggle like:", error);
        setLocalIsLiked(localIsLiked);
        setLikes((prev) => (localIsLiked ? prev + 1 : prev - 1));
      }
    } else {
      openModal("signin");
    }
  };

  const handleView = () => (user ? viewHandler(id, githubLink) : openModal("signin"));

  return (
    <div className="p-6 h-auto min-h-60 rounded shadow hover:shadow-lg bg-secondary hover:bg-secondaryHover cursor-pointer">
      <div className="flex justify-between items-center mb-4">
        <h2 className="md:text-2xl text-xl font-bold text-primary">{title}</h2>
        <div
          className={`text-sm flex gap-1 cursor-pointer ${localIsLiked ? "text-yellow-400" : "text-white"}`}
          onClick={likeHandler}
        >
          <FaStar size={18} />
          {likes}
        </div>
      </div>

      <p className="text-slate-300 text-sm mt-2">{description}</p>
      <p className="text-slate-300 text-xs my-2"><span className="text-primary">Tech</span>: {techStack}</p>
      <p className="text-slate-300 text-xs my-2"><span className="text-primary">Tags</span>: {tags}</p>

      <div className="flex items-center justify-between mt-5">
        <p className="text-primary text-lg my-2 font-semibold">{category}</p>
        <div className="flex gap-2 items-center">
          <FaBookmark
            size={30}
            className={`cursor-pointer ${localIsBookmarked ? "text-yellow-400" : "text-white"}`}
            onClick={bookMarkHandler}
          />
          <Button onClick={handleView} label="View" className="bg-primary hover:bg-primaryHover text-white text-md py-1" />
        </div>
      </div>

      {user?.id === authorId && (
        <div className="flex gap-2 mt-4">
          <Button icon={<FaEdit />} onClick={() => setIsEditOpen(true)} label="Edit" className="bg-blue-500 hover:bg-blue-600 text-white text-md py-1 w-1/2" />
          <Button icon={<FaTrash />} onClick={() => setIsDeleteOpen(true)} label="Delete" className="bg-red-500 hover:bg-red-600 text-white text-md py-1 w-1/2" />
        </div>
      )}

      {
      isEditOpen && 
      <EditTemplateForm
        templateId={id}
        onClose={() => setIsEditOpen(false)}
        defaultValues={{
            title: title,
            description: description,
            techStack: techStack,
            tags: tags,
            category: category,
        }}
      />  
      }
      {isDeleteOpen && <DeleteTemplateModal type="template" id={id} onClose={() => setIsDeleteOpen(false)} />}
    </div>
  );
};

export default TemplateCard;
