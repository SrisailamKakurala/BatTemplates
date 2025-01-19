import React from "react";
import { FaStar, FaBookmark } from "react-icons/fa";
import Button from "@/components/buttons/Button";


interface TemplateCardProps {
  title: string;
  description: string;
  likes: number;
  techStack: string;
  tags: string;
  category: string;
  id: string;
}

const TemplateCard: React.FC<TemplateCardProps> = ({
  title,
  description,
  likes,
  techStack,
  tags,
  category,
  id
}) => {

  const bookMarkHandler = () => {
    console.log("Bookmark Clicked");
  }

  return (
    <div className="p-6 h-60 rounded shadow hover:shadow-lg bg-secondary hover:bg-secondaryHover cursor-pointer">
      <div className="flex justify-between items-center mb-4">
        <h2 className="text-xl font-bold text-white">{title}</h2>
        <div className="text-sm flex gap-1 text-primary"><span><FaStar size={18} fill="#FFD700" /></span> {likes}</div>
      </div>

      <p className="text-slate-300 text-sm mt-2">{description}</p>

      <p className="text-slate-300 text-xs my-2"><span className="text-primary">Tech</span>: {techStack}</p>

      <p className="text-slate-300 text-xs my-2"><span className="text-primary">Tags</span>: {tags}</p>

      <div className="flex items-center justify-between mt-5">
        <p className="text-primary text-lg my-2 font-semibold">{category}</p>

        <div className="flex gap-2 items-center">
          <FaBookmark size={30} className="text-white cursor-pointer" onClick={bookMarkHandler} />
          <Button label="View" className="bg-primary hover:bg-primaryHover text-white text-md py-1" />
        </div>
      </div>


    
    </div>
  );
};

export default TemplateCard;
