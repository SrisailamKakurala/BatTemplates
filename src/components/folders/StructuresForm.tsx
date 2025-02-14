import { FaPlusCircle, FaTimesCircle } from "react-icons/fa";
import React, { useState } from "react";
import { useForm } from "react-hook-form";
import { userFolderProps } from "@/constants/interfaces";
import Input from "@/components/inputs/Input";
import Button from "@/components/buttons/Button";

interface FoldersFormProps {
  setFormVisible: React.Dispatch<React.SetStateAction<boolean>>;
}

const StructuresForm: React.FC<FoldersFormProps> = ({ setFormVisible }) => {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<Partial<userFolderProps>>();

  const [images, setImages] = useState<File[]>([]);

  const handleImageUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files) {
      setImages([...images, ...Array.from(e.target.files)]);
    }
  };

  const removeImage = (index: number) => {
    setImages(images.filter((_, i) => i !== index));
  };

  const onSubmit = (data: Partial<userFolderProps>) => {
    console.log("Folder Data:", data, "Images:", images);
    setFormVisible(false);
  };

  return (
    <div className="absolute inset-0 bg-black/50 flex items-center justify-center px-4 pb-4 md:pt-4 pt-24 overflow-y-scroll scroll-hide">
      <div className="max-w-5xl w-full bg-gray-900 p-6 rounded-lg shadow-lg border border-gray-800 flex flex-col gap-6 md:mt-0 mt-8">
        <form onSubmit={handleSubmit(onSubmit)} className="w-full flex flex-col gap-6">
          {/* FORM CONTENT: LEFT (Inputs) & RIGHT (Image Upload) */}
          <div className="w-full flex flex-col md:flex-row gap-6">
            {/* LEFT SIDE: Input Fields */}
            <div className="md:w-3/5 w-full space-y-4">
              <label className="text-white">
                Title
                <Input {...register("title", { required: "Title is required" })} />
              </label>

              <label className="text-white">
                Description
                <textarea
                  {...register("description", { required: "Description is required" })}
                  className="w-full h-20 rounded-md bg-[rgba(255,255,255,0.05)] px-3 py-2 text-slate-300 text-md focus:outline-none focus:ring-2 focus:ring-primary"
                />
                {errors.description && <p className="text-red-500">{errors.description.message}</p>}
              </label>

              <label className="text-white">
                Category
                <Input {...register("category", { required: "Category is required" })} />
              </label>

              <label className="text-white">
                Operating System
                <Input {...register("os", { required: "OS is required" })} />
              </label>

              <label className="text-white">
                Tech Stack
                <Input {...register("techStack", { required: "Tech Stack is required" })} />
              </label>

              <label className="text-white">
                How to Use
                <textarea
                  {...register("howToUse", { required: "How to Use is required" })}
                  className="w-full h-20 rounded-md bg-[rgba(255,255,255,0.05)] px-3 py-2 text-slate-300 text-md focus:outline-none focus:ring-2 focus:ring-primary"
                />
                {errors.howToUse && <p className="text-red-500">{errors.howToUse.message}</p>}
              </label>
            </div>

            {/* RIGHT SIDE: Image Upload Section */}
            <div className="md:w-2/5 w-full flex flex-col items-center gap-4">
              <label className="text-white flex flex-col items-center">
                Upload Structure Screenshots
                <input
                  type="file"
                  accept="image/*"
                  multiple
                  className="hidden"
                  onChange={handleImageUpload}
                  id="imageUpload"
                />
                <label htmlFor="imageUpload" className="cursor-pointer mt-2">
                  <FaPlusCircle className="text-primary text-5xl hover:opacity-80 transition" />
                </label>
              </label>

              {/* Image Previews */}
              {images.length > 0 && (
                <div className="grid grid-cols-3 gap-3 mt-2">
                  {images.map((file, index) => (
                    <div key={index} className="relative">
                      <img
                        src={URL.createObjectURL(file)}
                        alt={`Preview ${index}`}
                        className="w-24 h-24 object-cover rounded-md border border-gray-700"
                      />
                      <button
                        type="button"
                        className="absolute -top-2 -right-2 bg-black rounded-full p-1"
                        onClick={() => removeImage(index)}
                      >
                        <FaTimesCircle className="text-red-500 text-lg" />
                      </button>
                    </div>
                  ))}
                </div>
              )}
            </div>
          </div>

          {/* BUTTONS: Placed in a separate div for better alignment */}
          <div className="flex justify-center gap-4">
            <Button label="Upload Folder" className="bg-primary text-white" />
            <Button label="Cancel" onClick={() => setFormVisible(false)} className="bg-primaryBg text-white" />
          </div>
        </form>
      </div>
    </div>
  );
};

export default StructuresForm;
