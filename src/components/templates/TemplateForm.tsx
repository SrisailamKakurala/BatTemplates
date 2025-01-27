import React from "react";
import { useForm, SubmitHandler } from "react-hook-form";
import { FaPlus, FaTimes } from "react-icons/fa";
import Button from "@/components/buttons/Button";
import Input from "@/components/inputs/Input";
import { submitTemplate } from "@/firebase/services/templateServices/submitTemplate";
import { useToast } from "@/hooks/ui/useToast"; // Import the useToast hook

interface TemplateFormProps {
  setFormVisible: React.Dispatch<React.SetStateAction<boolean>>;
}

interface FormData {
  title: string;
  description: string;
  techStack: string;
  tags: string;
  category: string;
  githubLink: string;
}

const TemplateForm: React.FC<TemplateFormProps> = ({ setFormVisible }) => {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<FormData>();

  const { addToast } = useToast(); // Use the useToast hook

  const user = JSON.parse(localStorage.getItem("user") || "{}");

  const onSubmit: SubmitHandler<FormData> = async (data) => {
    const templateData = {
      ...data,
      likes: 0,
      author: user?.name || "Anonymous",
      authorEmail: user?.email || "N/A",
      authorId: user?.id || "N/A",
      isApproved: false,
      createdAt: Date.now(),
      reviewedAt: null,
    };

    try {
      await submitTemplate(templateData, addToast); // Pass addToast to the service
      setFormVisible(false); // Close the modal
    } catch (error) {
      console.error("Error submitting template:", error);
    }
  };

  return (
    <div className="fixed inset-0 bg-black bg-opacity-80 flex justify-center items-center z-50">
      <div className="bg-secondary w-full max-w-lg rounded-lg shadow-lg p-6">
        {/* Header */}
        <div className="flex justify-between items-center mb-4">
          <h2 className="text-xl font-bold text-primary">Submit a Template</h2>
          <button
            onClick={() => setFormVisible(false)}
            className="text-primary"
          >
            <FaTimes size={20} />
          </button>
        </div>

        {/* Form */}
        <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
          <div>
            <label htmlFor="title" className="block text-sm font-medium text-slate-300 mb-1">
              Title
            </label>
            <Input
              {...register("title", { required: true })}
              id="title"
              placeholder="e.g., React Portfolio Template"
              error={!!errors.title}
            />
            {errors.title && <p className="text-sm text-primary">Title is required.</p>}
          </div>

          <div>
            <label htmlFor="description" className="block text-sm font-medium text-slate-300 mb-1">
              Description
            </label>
            <Input
              {...register("description", { required: true })}
              id="description"
              placeholder="e.g., A modern React portfolio with animations and dark mode."
              error={!!errors.description}
            />
            {errors.description && <p className="text-sm text-primary">Description is required.</p>}
          </div>

          <div>
            <label htmlFor="techStack" className="block text-sm font-medium text-slate-300 mb-1">
              Tech Stack
            </label>
            <Input
              {...register("techStack", { required: true })}
              id="techStack"
              placeholder="e.g., React, Node.js, TailwindCSS"
              error={!!errors.techStack}
            />
            {errors.techStack && <p className="text-sm text-primary">Tech Stack is required.</p>}
          </div>

          <div>
            <label htmlFor="tags" className="block text-sm font-medium text-slate-300 mb-1">
              Tags
            </label>
            <Input
              {...register("tags", { required: true })}
              id="tags"
              placeholder="e.g., portfolio, react, modern-design"
              error={!!errors.tags}
            />
            {errors.tags && <p className="text-sm text-primary">Tags are required.</p>}
          </div>

          <div>
            <label htmlFor="category" className="block text-sm font-medium text-slate-300 mb-1">
              Category
            </label>
            <Input
              {...register("category", { required: true })}
              id="category"
              placeholder="e.g., Frontend, Fullstack"
              error={!!errors.category}
            />
            {errors.category && <p className="text-sm text-primary">Category is required.</p>}
          </div>

          <div>
            <label htmlFor="githubLink" className="block text-sm font-medium text-slate-300 mb-1">
              GitHub Link
            </label>
            <Input
              {...register("githubLink", {
                required: true,
                pattern: {
                  value: /https?:\/\/(www\.)?github\.com\/.+/,
                  message: "Enter a valid GitHub URL.",
                },
              })}
              id="githubLink"
              placeholder="e.g., https://github.com/username/repo"
              error={!!errors.githubLink}
            />
            {errors.githubLink && (
              <p className="text-sm text-primary">
                {errors.githubLink.message || "GitHub Link is required."}
              </p>
            )}
          </div>

          {/* Submit Button */}
          <div className="flex justify-end">
            <Button
              label="Submit"
              icon={<FaPlus />}
              className="bg-primary text-white text-sm px-4 py-2"
            />
          </div>
        </form>
      </div>
    </div>
  );
};

export default TemplateForm;