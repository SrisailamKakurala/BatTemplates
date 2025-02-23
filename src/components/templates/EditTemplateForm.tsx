import React from "react";
import { useForm, SubmitHandler } from "react-hook-form";
import Input from "@/components/inputs/Input";
import Button from "@/components/buttons/Button";
import { updateTemplate } from "@/firebase/services/templateServices/updateTemplate.service";
import { useToast } from "@/hooks/ui/useToast";

interface EditTemplateFormProps {
    templateId: string;
    onClose: () => void;
    defaultValues: {
        title: string;
        description: string;
        techStack: string;
        tags: string;
        category: string;
    };
}

const EditTemplateForm: React.FC<EditTemplateFormProps> = ({ templateId, onClose, defaultValues }) => {
    const { register, handleSubmit, formState: { errors } } = useForm({ defaultValues });
    const { addToast } = useToast(); // Get addToast function

    const onSubmit: SubmitHandler<any> = async (data) => {
        try {
            await updateTemplate(templateId, data);
            addToast("Template updated successfully!", "success");
            onClose();
        } catch (error) {
            console.error("Failed to update template:", error);
            addToast("Failed to update template. Please try again.", "error");
        }
    };

    return (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center z-50">
            <div className="bg-secondary rounded-lg shadow-lg p-6 w-full max-w-md">
                <h2 className="text-xl font-bold text-primary mb-4">Edit Template</h2>
                <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
                    {/* Title Field */}
                    <div>
                        <label htmlFor="title" className="block text-sm font-medium text-primary">Title</label>
                        <Input id="title" {...register("title", { required: "Title is required" })} error={!!errors.title} />
                    </div>

                    {/* Description Field */}
                    <div>
                        <label htmlFor="description" className="block text-sm font-medium text-primary">Description</label>
                        <Input id="description" {...register("description", { required: "Description is required" })} error={!!errors.description} />
                    </div>

                    {/* Tech Stack Field */}
                    <div>
                        <label htmlFor="techStack" className="block text-sm font-medium text-primary">Tech Stack</label>
                        <Input id="techStack" {...register("techStack", { required: "Tech stack is required" })} error={!!errors.techStack} />
                    </div>

                    {/* Tags Field */}
                    <div>
                        <label htmlFor="tags" className="block text-sm font-medium text-primary">Tags</label>
                        <Input id="tags" {...register("tags", { required: "Tags are required" })} error={!!errors.tags} />
                    </div>

                    {/* Category Field */}
                    <div>
                        <label htmlFor="category" className="block text-sm font-medium text-primary">Category</label>
                        <Input id="category" {...register("category", { required: "Category is required" })} error={!!errors.category} />
                    </div>

                    <div className="flex justify-end gap-4">
                        <Button onClick={onClose} label="Cancel" className="bg-gray-600" />
                        <Button label="Save" className="bg-primary hover:bg-primaryHover" />
                    </div>
                </form>
            </div>
        </div>
    );
};

export default EditTemplateForm;
