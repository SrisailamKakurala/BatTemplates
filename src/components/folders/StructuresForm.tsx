import React from "react";
import { useForm, Controller } from "react-hook-form";
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
    control,
    formState: { errors },
  } = useForm<Partial<userFolderProps>>();

  const onSubmit = (data: Partial<userFolderProps>) => {
    console.log("Folder Data:", data);
    setFormVisible(false);
  };

  return (
    <div className="fixed inset-0 bg-black/50 flex items-center justify-center px-4">
      <div className="max-w-5xl w-full bg-gray-900 p-6 rounded-lg shadow-lg border border-gray-800 flex gap-6">
        <form onSubmit={handleSubmit(onSubmit)} className="w-full flex gap-6">
          {/* LEFT SIDE: Input Fields */}
          <div className="w-3/5 space-y-4">
            <label className="text-white">
              Title
              <Input {...register("title", { required: "Title is required" })} />
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
              Description
              <textarea
                {...register("description", { required: "Description is required" })}
                className="w-full h-20 rounded-md bg-[rgba(255,255,255,0.05)] px-3 py-2 text-slate-300 text-md focus:outline-none focus:ring-2 focus:ring-primary"
              />
              {errors.description && <p className="text-red-500">{errors.description.message}</p>}
            </label>

            <label className="text-white">
              How to Use
              <textarea
                {...register("howToUse", { required: "How to Use is required" })}
                className="w-full h-20 rounded-md bg-[rgba(255,255,255,0.05)] px-3 py-2 text-slate-300 text-md focus:outline-none focus:ring-2 focus:ring-primary"
              />
              {errors.howToUse && <p className="text-red-500">{errors.howToUse.message}</p>}
            </label>

            <div className="flex gap-4">
              <Button label="Upload Folder" />
              <Button label="Cancel" onClick={() => setFormVisible(false)} className="bg-gray-700" />
            </div>
          </div>

          {/* RIGHT SIDE: Structure TextArea */}
          <div className="w-2/5">
            <label className="text-white">
              Folder Structure
              <Controller
                name="structure"
                control={control}
                rules={{ required: "Structure is required" }}
                render={({ field }) => (
                  <textarea
                    {...field}
                    className="w-full h-48 rounded-md bg-[rgba(255,255,255,0.05)] px-3 py-2 text-slate-300 text-md focus:outline-none focus:ring-2 focus:ring-primary"
                  />
                )}
              />
              {errors.structure && <p className="text-red-500">{errors.structure.message}</p>}
            </label>
          </div>
        </form>
      </div>
    </div>
  );
};

export default StructuresForm;
