import React, { useState } from "react";
import Modal from "react-modal";
import Button from "@/components/buttons/Button";
import { Folder } from "@/constants/schema";
import { FaTimes } from "react-icons/fa";

interface EditStructureFormProps {
  isOpen: boolean;
  onClose: () => void;
  structure: Folder;
  onSubmit: (updatedStructure: Folder) => void;
}

const EditStructureForm: React.FC<EditStructureFormProps> = ({
  isOpen,
  onClose,
  structure,
  onSubmit,
}) => {
  const [formData, setFormData] = useState({
    title: structure.title,
    description: structure.description,
    category: structure.category,
    os: structure.os,
    techStack: structure.techStack,
    howToUse: structure.howToUse,
  });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onSubmit({ ...structure, ...formData });
    onClose();
  };

  return (
    <div className="overflow-y-scroll scroll-hide py-3">
      <Modal
      isOpen={isOpen}
      onRequestClose={onClose}
      contentLabel="Edit Structure"
      className="absolute scroll-hide inset-0 flex items-center justify-center bg-black bg-opacity-50"
      overlayClassName="absolute inset-0 bg-black bg-opacity-75"
    >
      <div className="bg-gray-800 p-6 rounded-lg w-full max-w-2xl mx-4 sm:w-2/3 lg:w-1/2 relative md:mt-0 md:mb-0 scroll-hide mt-40 mb-2">
        {/* Close Button */}
        <button className="absolute top-3 right-3 text-white text-xl" onClick={onClose}>
          <FaTimes />
        </button>

        <h2 className="text-2xl font-bold text-primary mb-4">Edit Structure</h2>

        <form onSubmit={handleSubmit} className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          {/* Left Side */}
          <div className="space-y-4">
            <div>
              <label className="text-white text-sm">Title</label>
              <input
                type="text"
                name="title"
                value={formData.title}
                onChange={handleChange}
                className="w-full p-2 rounded bg-gray-700 text-white"
                required
              />
            </div>

            <div>
              <label className="text-white text-sm">OS</label>
              <input
                type="text"
                name="os"
                value={formData.os}
                onChange={handleChange}
                className="w-full p-2 rounded bg-gray-700 text-white"
              />
            </div>

            <div>
              <label className="text-white text-sm">Description</label>
              <textarea
                name="description"
                value={formData.description}
                onChange={handleChange}
                className="w-full p-2 rounded bg-gray-700 text-white h-24"
                required
              />
            </div>
          </div>

          {/* Right Side */}
          <div className="space-y-4">
            <div>
              <label className="text-white text-sm">Category</label>
              <input
                type="text"
                name="category"
                value={formData.category}
                onChange={handleChange}
                className="w-full p-2 rounded bg-gray-700 text-white"
                required
              />
            </div>

            <div>
              <label className="text-white text-sm">Tech Stack</label>
              <input
                type="text"
                name="techStack"
                value={formData.techStack}
                onChange={handleChange}
                className="w-full p-2 rounded bg-gray-700 text-white"
              />
            </div>

            <div>
              <label className="text-white text-sm">How to Use</label>
              <textarea
                name="howToUse"
                value={formData.howToUse}
                onChange={handleChange}
                className="w-full p-2 rounded bg-gray-700 text-white h-24"
              />
            </div>
          </div>

          {/* Buttons (Full Width on Mobile) */}
          <div className="col-span-1 sm:col-span-2 flex flex-col sm:flex-row gap-2 mt-4">
            <Button
              label="Cancel"
              onClick={onClose}
              className="bg-gray-600 hover:bg-gray-700 text-white py-2 px-4 rounded w-full sm:w-1/2"
            />
            <Button
              label="Save Changes"
              className="bg-primary hover:bg-primaryHover text-white py-2 px-4 rounded w-full sm:w-1/2"
            />
          </div>
        </form>
      </div>
      </Modal>
    </div>
  );
};

export default EditStructureForm;
