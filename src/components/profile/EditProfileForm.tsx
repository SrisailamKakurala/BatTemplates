import React from "react";
import { useForm, SubmitHandler } from "react-hook-form";
import { FiGithub, FiLinkedin, FiTwitter, FiInstagram } from "react-icons/fi";
import Input from "@/components/inputs/Input";
import Button from "@/components/buttons/Button";
import { updateProfile } from "@/firebase/services/userServices/updateProfile.service";
import { useToast } from "@/hooks/ui/useToast"; // Import the useToast hook
import useUtilsStore from "@/store/utilsStore";
import useAuthStore from "@/store/authStore";

interface FormData {
  name: string;
  location: string;
  githubLink: string;
  linkedinLink: string;
  xLink: string;
  instagramLink: string;
}

interface EditProfileFormProps {
  onClose: () => void; // Function to close the form
}

const EditProfileForm: React.FC<EditProfileFormProps> = ({ onClose }) => {

  const currentUser = JSON.parse(localStorage.getItem("user") || "{}");
  const { addToast } = useToast();
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<FormData>();

  const onSubmit: SubmitHandler<FormData> = async (data) => {
    if (!currentUser) {
      console.error("No user is logged in.");
      return;
    }
  
    // Format social links into an array of objects
    const personalLinks = [
      { platform: "GitHub", url: data.githubLink },
      { platform: "LinkedIn", url: data.linkedinLink },
      { platform: "X", url: data.xLink },
      { platform: "Instagram", url: data.instagramLink },
    ].filter((link) => link.url); // Filter out empty links
  
    const profileData = {
      name: data.name,
      location: data.location,
      personalLinks,
    };
  
    try {
  
      // Update the profile in Firestore and get the updated user data
      const updatedUser = await updateProfile(currentUser.id, profileData);
  
      // Update the user in `auth-storage` using useAuthStore
      useAuthStore.getState().signIn({
        ...currentUser,
        ...updatedUser,
      });
  
      // Trigger profile reload using useUtilsStore
      useUtilsStore.getState().setReloadProfile(true);
  
      // Show success toast
      addToast("Profile updated successfully!", "success");
  
      // Close the form after successful submission
      onClose();
    } catch (error) {
      console.error("Error updating profile:", error);
  
      // Show error toast
      addToast("Failed to update profile. Please try again.", "error");
    }
  };
  

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center z-50">
      <div className="bg-secondary rounded-lg shadow-lg p-6 w-full max-w-md">
        <h2 className="text-xl font-bold text-primary mb-4">Edit Profile</h2>
        <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
          {/* Name Field */}
          <div>
            <label htmlFor="name" className="block text-sm font-medium text-slate-300 mb-1">
              Name
            </label>
            <Input
              type="text"
              id="name"
              placeholder="Enter your name"
              {...register("name", { required: "Name is required" })}
              error={!!errors.name}
            />
            {errors.name && (
              <p className="mt-1 text-sm text-primary">{errors.name.message}</p>
            )}
          </div>

          {/* Location Field */}
          <div>
            <label htmlFor="location" className="block text-sm font-medium text-slate-300 mb-1">
              Location
            </label>
            <Input
              type="text"
              id="location"
              placeholder="Enter your location"
              {...register("location", { required: "Location is required" })}
              error={!!errors.location}
            />
            {errors.location && (
              <p className="mt-1 text-sm text-primary">{errors.location.message}</p>
            )}
          </div>

          {/* Social Links Section */}
          <div className="space-y-4">
            <h3 className="text-lg font-semibold text-slate-300">Social Links</h3>

            {/* GitHub Link */}
            <div>
              <label htmlFor="githubLink" className="block text-sm font-medium text-slate-300 mb-1">
                <FiGithub className="inline-block mr-2" />
                GitHub
              </label>
              <Input
                type="url"
                id="githubLink"
                placeholder="https://github.com/username"
                {...register("githubLink", {
                  pattern: {
                    value: /https?:\/\/.+/,
                    message: "Enter a valid URL",
                  },
                })}
                error={!!errors.githubLink}
              />
              {errors.githubLink && (
                <p className="mt-1 text-sm text-primary">{errors.githubLink.message}</p>
              )}
            </div>

            {/* LinkedIn Link */}
            <div>
              <label htmlFor="linkedinLink" className="block text-sm font-medium text-slate-300 mb-1">
                <FiLinkedin className="inline-block mr-2" />
                LinkedIn
              </label>
              <Input
                type="url"
                id="linkedinLink"
                placeholder="https://linkedin.com/in/username"
                {...register("linkedinLink", {
                  pattern: {
                    value: /https?:\/\/.+/,
                    message: "Enter a valid URL",
                  },
                })}
                error={!!errors.linkedinLink}
              />
              {errors.linkedinLink && (
                <p className="mt-1 text-sm text-primary">{errors.linkedinLink.message}</p>
              )}
            </div>

            {/* X (Twitter) Link */}
            <div>
              <label htmlFor="xLink" className="block text-sm font-medium text-slate-300 mb-1">
                <FiTwitter className="inline-block mr-2" />
                X (Twitter)
              </label>
              <Input
                type="url"
                id="xLink"
                placeholder="https://x.com/username"
                {...register("xLink", {
                  pattern: {
                    value: /https?:\/\/.+/,
                    message: "Enter a valid URL",
                  },
                })}
                error={!!errors.xLink}
              />
              {errors.xLink && (
                <p className="mt-1 text-sm text-primary">{errors.xLink.message}</p>
              )}
            </div>

            {/* Instagram Link */}
            <div>
              <label htmlFor="instagramLink" className="block text-sm font-medium text-slate-300 mb-1">
                <FiInstagram className="inline-block mr-2" />
                Instagram
              </label>
              <Input
                type="url"
                id="instagramLink"
                placeholder="https://instagram.com/username"
                {...register("instagramLink", {
                  pattern: {
                    value: /https?:\/\/.+/,
                    message: "Enter a valid URL",
                  },
                })}
                error={!!errors.instagramLink}
              />
              {errors.instagramLink && (
                <p className="mt-1 text-sm text-primary">{errors.instagramLink.message}</p>
              )}
            </div>
          </div>

          {/* Form Buttons */}
          <div className="flex justify-end space-x-4">
            <Button
              label="Cancel"
              onClick={onClose} // Use the onClose prop to close the form
              className="px-4 py-2 text-whiteText bg-slate-600 rounded-md hover:bg-slate-700 transition-all"
            />
            <Button
              label="Save Changes"
              className="px-4 py-2 text-whiteText bg-primary rounded-md hover:bg-primaryHover transition-all"
            />
          </div>
        </form>
      </div>
    </div>
  );
};

export default EditProfileForm;