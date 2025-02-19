import React, { useState } from "react";
import { FaStar, FaDownload, FaEdit, FaTrash, FaImages } from "react-icons/fa";
import Button from "@/components/buttons/Button";
import useModalStore from "@/store/modalStore";
import { Folder } from "@/constants/schema";
import { toggleLike } from "@/firebase/services/folderServices/like.service";
import ImageModal from "@/components/modals/ImageModal";
import EditStructureForm from "./EditStructureForm";

interface StructureCardProps {
    folder: Folder;
}

const StructureCard: React.FC<StructureCardProps> = ({ folder }) => {
    const {
        id,
        title,
        description,
        category,
        os,
        techStack,
        howToUse,
        downloadLink,
        downloads,
        images = [],
        likes,
        authorId,
    } = folder;

    const { openModal } = useModalStore();
    const user = JSON.parse(localStorage.getItem("auth-storage") || "{}")?.state?.user;
    const [localIsLiked, setLocalIsLiked] = useState(likes.includes(user?.id || ""));
    const [likesCount, setLikesCount] = useState(likes.length);
    const [isEditOpen, setIsEditOpen] = useState(false);
    const [isDeleteOpen, setIsDeleteOpen] = useState(false);
    const [isImageModalOpen, setIsImageModalOpen] = useState(false);

    const likeHandler = async () => {
        if (user) {
            try {
                setLocalIsLiked(!localIsLiked);
                setLikesCount((prev) => (localIsLiked ? prev - 1 : prev + 1));
                await toggleLike(id, user.id, localIsLiked);
            } catch (error) {
                console.error("Failed to toggle like:", error);
                setLocalIsLiked(localIsLiked);
                setLikesCount((prev) => (localIsLiked ? prev + 1 : prev - 1));
            }
        } else {
            openModal("signin");
        }
    };

    const handleEditSubmit = async (updatedData: Folder) => {
        try {
            // Call your API or Firestore update function
            // await updateStructure(id, updatedData);
            setIsEditOpen(false);
        } catch (error) {
            console.error("Failed to update structure:", error);
        }
    };

    const downloadHandler = () => {
        if (user) {
            window.open(downloadLink, "_blank");
        } else {
            openModal("signin");
        }
    };

    return (
        <div className="p-6 h-auto min-h-60 rounded shadow hover:shadow-lg bg-secondary hover:bg-secondaryHover cursor-pointer flex flex-col justify-between">
            <div className="flex justify-between items-center mb-4">
                <h2 className="md:text-2xl text-xl font-bold text-primary">{title}</h2>
                <div
                    className={`text-sm flex gap-1 cursor-pointer ${localIsLiked ? "text-yellow-400" : "text-white"}`}
                    onClick={likeHandler}
                >
                    <FaStar size={18} />
                    {likesCount}
                </div>
            </div>

            <div className="">

                <p className="text-slate-300 text-sm mt-2">{description}</p>
                <p className="text-slate-300 text-xs my-2">
                    <span className="text-primary">Category</span>: {category}
                </p>
                <p className="text-slate-300 text-xs my-2">
                    <span className="text-primary">OS</span>: {os}
                </p>
                <p className="text-slate-300 text-xs my-2">
                    <span className="text-primary">Tech Stack</span>: {techStack}
                </p>
                <p className="text-slate-300 text-xs my-2">
                    <span className="text-primary">How to Use</span>: {howToUse}
                </p>

            </div>

            <div>
                <div className="flex items-center justify-between mt-5">
                    <p className="text-primary text-lg my-2 font-semibold">{downloads} Downloads</p>
                    <Button
                        icon={<FaDownload />}
                        onClick={downloadHandler}
                        label="Download"
                        className="bg-primary hover:bg-primaryHover text-white text-md py-1"
                    />
                </div>

                {user?.id === authorId && (
                    <div className="flex gap-2 mt-4">
                        <Button
                            icon={<FaEdit />}
                            onClick={() => setIsEditOpen(true)}
                            label="Edit"
                            className="bg-blue-500 hover:bg-blue-600 text-white text-md py-1 w-1/2"
                        />
                        <Button
                            icon={<FaTrash />}
                            onClick={() => setIsDeleteOpen(true)}
                            label="Delete"
                            className="bg-red-500 hover:bg-red-600 text-white text-md py-1 w-1/2"
                        />
                    </div>
                )}

                {images.length > 0 && (
                    <Button
                        icon={<FaImages />}
                        onClick={() => setIsImageModalOpen(true)}
                        label="View Structure"
                        className="bg-green-500 hover:bg-green-600 text-white text-md py-1 mt-4 w-full"
                    />
                )}
            </div>

            {isEditOpen && (
                <EditStructureForm
                    isOpen={isEditOpen}
                    onClose={() => setIsEditOpen(false)}
                    structure={folder}
                    onSubmit={handleEditSubmit}
                />
            )}

            <ImageModal isOpen={isImageModalOpen} onClose={() => setIsImageModalOpen(false)} images={images} />
        </div>
    );
};

export default StructureCard;
