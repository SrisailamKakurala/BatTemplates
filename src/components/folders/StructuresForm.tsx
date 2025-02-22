import { FaFileAlt, FaUpload, FaTrash, FaImages } from "react-icons/fa";
import React, { useState } from "react";
import { useForm } from "react-hook-form";
import { Folder } from "@/constants/schema";
import Input from "@/components/inputs/Input";
import Button from "@/components/buttons/Button";
import { uploadFolderStructure } from "@/firebase/services/folderServices/uploadFolders.service";
import { getUser } from "@/utils/localStorageUtil";
import { useToast } from "@/hooks/ui/useToast";


interface FoldersFormProps {
  setFormVisible: React.Dispatch<React.SetStateAction<boolean>>;
}

const StructuresForm: React.FC<FoldersFormProps> = ({ setFormVisible }) => {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<Partial<Folder>>();

  const { addToast } = useToast(); // Use the useToast hook
  

  const [images, setImages] = useState<File[]>([]);
  const [file, setFile] = useState<File | null>(null);

  const handleImageUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files) {
      setImages([...images, ...Array.from(e.target.files)]);
    }
  };

  const removeImage = (index: number) => {
    setImages(images.filter((_, i) => i !== index));
  };

  const handleFileUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files?.[0]) {
      setFile(e.target.files[0]);
    }
  };

  const removeFile = () => {
    setFile(null);
  };

  const onSubmit = async (data: Partial<Folder>) => {
    const user = getUser(); // Fetch user details from local storage
    if (!user) {
      console.error("User not authenticated");
      return;
    }
  
    if (!file) {
      addToast("Script file is required!", "error");
      return;
    }
  
    if (images.length === 0) {
      addToast("At least one image is required!", "error");
      return;
    }
  
    console.log("Uploading folder structure...");
  
    const folderId = await uploadFolderStructure(data, file, images, user.id, user.email);
  
    if (folderId) {
      console.log("Folder uploaded successfully:", folderId);
      setFormVisible(false);
      addToast("Structure Submitted successfully!", "success");
    } else {
      console.error("Failed to upload folder structure.");
    }
  };
  
  

  return (
    <div className="absolute inset-0 bg-black/50 flex items-center justify-center px-4 pb-4 md:pt-4 pt-24 overflow-y-scroll scroll-hide">
      <div className="max-w-5xl w-full bg-gray-900 p-6 rounded-lg shadow-lg border border-gray-800 flex flex-col gap-6 md:mt-0 mt-8">
        <form onSubmit={handleSubmit(onSubmit)} className="w-full flex flex-col gap-6">
          {/* FORM CONTENT: LEFT (Inputs) & RIGHT (Uploads) */}
          <div className="w-full flex flex-col md:flex-row gap-6">
            {/* LEFT SIDE: Input Fields */}
            <div className="md:w-3/5 w-full space-y-4">
              {[
                { label: "Title", name: "title" },
                { label: "Category", name: "category" },
                { label: "Operating System", name: "os" },
                { label: "Tech Stack", name: "techStack" },
              ].map(({ label, name }) => (
                <label key={name} className="text-white block">
                  {label}
                  <Input
                    {...register(name as keyof Folder, { required: `${label} is required` })}
                    className="w-full border border-gray-700 bg-gray-800 px-3 py-2 rounded-md focus:outline-none focus:ring-2 focus:ring-primary"
                  />
                  {errors[name as keyof Folder] && (
                    <p className="text-red-500 text-sm mt-1">{errors[name as keyof Folder]?.message}</p>
                  )}
                </label>
              ))}

              {[
                { label: "Description", name: "description" },
                { label: "How to Use", name: "howToUse" },
              ].map(({ label, name }) => (
                <label key={name} className="text-white block">
                  {label}
                  <textarea
                    {...register(name as keyof Folder, { required: `${label} is required` })}
                    className="w-full h-20 rounded-md border border-gray-700 bg-gray-800 px-3 py-2 text-slate-300 text-md focus:outline-none focus:ring-2 focus:ring-primary"
                  />
                  {errors[name as keyof Folder] && (
                    <p className="text-red-500 text-sm mt-1">{errors[name as keyof Folder]?.message}</p>
                  )}
                </label>
              ))}
            </div>

            {/* RIGHT SIDE: Upload Sections (Unchanged) */}
            <div className="md:w-2/5 w-full flex flex-col gap-4">
              {/* SCRIPT UPLOAD (Equal Height) */}
              <div className="bg-gray-800 p-4 rounded-lg flex flex-col items-center justify-center h-[45%] gap-3 mt-5">
                <FaFileAlt className="text-gray-400 text-3xl" />
                <p className="text-white">Upload Script (.sh or .bat)</p>
                <input
                  type="file"
                  accept=".sh,.bat"
                  className="hidden"
                  onChange={handleFileUpload}
                  id="fileUpload"
                />
                <label
                  htmlFor="fileUpload"
                  className="cursor-pointer px-4 py-2 bg-blue-600 hover:bg-blue-700 text-white rounded-md flex items-center gap-2"
                >
                  <FaUpload /> Choose File
                </label>
                {!file && <p className="text-red-500 text-sm mt-1">Script file is required</p>}
                {file && (
                  <div className="flex items-center gap-2 text-white mt-2">
                    {file.name}{" "}
                    <button onClick={removeFile} className="text-red-400 hover:text-red-500">
                      <FaTrash />
                    </button>
                  </div>
                )}
              </div>

              {/* IMAGE UPLOAD (Equal Height) */}
              <div className="bg-gray-800 p-4 rounded-lg flex flex-col items-center justify-center h-[48%] gap-3">
                <FaImages className="text-gray-400 text-3xl" />
                <p className="text-white">Upload Screenshots of Structure</p>
                <input
                  type="file"
                  accept="image/*"
                  multiple
                  className="hidden"
                  onChange={handleImageUpload}
                  id="imageUpload"
                />
                <label
                  htmlFor="imageUpload"
                  className="cursor-pointer px-4 py-2 bg-green-600 hover:bg-green-700 text-white rounded-md flex items-center gap-2"
                >
                  <FaUpload /> Upload Images
                </label>
                {images.length === 0 && <p className="text-red-500 text-sm mt-1">At least one image is required</p>}
                <div className="flex flex-wrap gap-2 mt-2">
                  {images.map((file, index) => (
                    <div key={index} className="relative">
                      <img
                        src={URL.createObjectURL(file)}
                        className="w-12 h-12 rounded-md border border-gray-700"
                      />
                      <button
                        onClick={() => removeImage(index)}
                        className="absolute top-0 right-0 text-red-400 hover:text-red-500"
                      >
                        <FaTrash />
                      </button>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>

          {/* BUTTONS: Centered and Styled */}
          <div className="flex justify-center gap-4">
            <Button
              label="Submit Structure"
              className="bg-primary text-white px-4 py-2 rounded-md hover:bg-primaryHover transition"
            />
            <Button
              label="Cancel"
              onClick={() => setFormVisible(false)}
              className="bg-gray-700 text-white px-4 py-2 rounded-md hover:bg-gray-600 transition"
            />
          </div>
        </form>
      </div>
    </div>
  );
};

export default StructuresForm;
