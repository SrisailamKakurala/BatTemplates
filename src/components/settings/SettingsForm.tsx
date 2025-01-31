import React, { useState } from "react"; // Import useState
import { FiSettings, FiFile, FiEdit, FiCalendar, FiBookOpen } from "react-icons/fi";
// import { saveSiteSettings } from "@/firebase/services/adminServices/siteSettings.service";
import { useToast } from "@/hooks/ui/useToast";

interface SettingsFormProps {
  onSubmit: (settings: {
    siteName: string;
    siteDescription: string;
    since: string;
    guidelines: string;
    logo?: File | null;
  }) => void;
}

const SettingsForm: React.FC<SettingsFormProps> = ({ onSubmit }) => {
  const [siteName, setSiteName] = useState("");
  const [siteDescription, setSiteDescription] = useState("");
  const [since, setSince] = useState("");
  const [logo, setLogo] = useState<File | null>(null);
  const [guidelines, setGuidelines] = useState("");
  const { addToast } = useToast(); // Hook for toast notifications

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      setLogo(e.target.files[0]);
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    try {
      // Call the service to save the settings and upload the logo
      // await saveSiteSettings(
      //   {
      //     siteName,
      //     siteDescription,
      //     since,
      //     guidelines,
      //   },
      //   logo
      // );

      // Show success toast
      addToast("Settings saved successfully!", "success");

      // Clear fields after submission
      setSiteName("");
      setSiteDescription("");
      setSince("");
      setGuidelines("");
      setLogo(null);

      // Trigger the onSubmit callback
      onSubmit({ siteName, siteDescription, since, guidelines, logo });
    } catch (error) {
      // Show error toast if something goes wrong
      addToast("Failed to save settings. Please try again.", "error");
    }
  };

  return (
    <form onSubmit={handleSubmit} className="bg-secondary lg:p-8 p-4 rounded-lg shadow-lg max-w-6xl mx-auto w-full">
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
        <div>
          <label className="text-yellow-500 text-lg font-semibold mb-2 flex items-center gap-2" htmlFor="siteName">
            <FiEdit />
            Site Name
          </label>
          <input
            type="text"
            id="siteName"
            className="w-full p-3 rounded-lg bg-white/5 text-white focus:outline-none focus:ring focus:ring-primary"
            value={siteName}
            onChange={(e) => setSiteName(e.target.value)}
            placeholder="Enter site name"
            required
          />
        </div>

        <div>
          <label className="text-yellow-500 text-lg font-semibold mb-2 flex items-center gap-2" htmlFor="since">
            <FiCalendar />
            Since
          </label>
          <input
            type="text"
            id="since"
            className="w-full p-3 rounded-lg bg-white/5 text-white focus:outline-none focus:ring focus:ring-primary"
            value={since}
            onChange={(e) => setSince(e.target.value)}
            placeholder="Enter the year (e.g., 2025)"
          />
        </div>

        <div className="sm:col-span-2">
          <label className="text-yellow-500 text-lg font-semibold mb-2 flex items-center gap-2" htmlFor="siteDescription">
            <FiBookOpen />
            Site Description
          </label>
          <textarea
            id="siteDescription"
            className="w-full p-3 rounded-lg bg-white/5 text-white focus:outline-none focus:ring focus:ring-primary"
            value={siteDescription}
            onChange={(e) => setSiteDescription(e.target.value)}
            placeholder="Enter site description"
            rows={4}
          />
        </div>

        <div>
          <label className="text-yellow-500 text-lg font-semibold mb-2 flex items-center gap-2" htmlFor="logo">
            <FiFile />
            Logo
          </label>
          <input
            type="file"
            id="logo"
            className="w-full text-white bg-white/5 focus:outline-none"
            onChange={handleFileChange}
          />
        </div>

        <div className="sm:col-span-2">
          <label className="text-yellow-500 text-lg font-semibold mb-2 flex items-center gap-2" htmlFor="guidelines">
            <FiBookOpen />
            Contributor Guidelines
          </label>
          <textarea
            id="guidelines"
            className="w-full p-3 rounded-lg bg-white/5 text-white focus:outline-none focus:ring focus:ring-primary"
            value={guidelines}
            onChange={(e) => setGuidelines(e.target.value)}
            placeholder="Enter contributor guidelines"
            rows={4}
          />
        </div>
      </div>

      <div className="flex justify-center mt-6">
        <button
          type="submit"
          className="bg-primary text-white px-6 py-3 rounded-lg font-semibold hover:bg-red-700 transition-colors flex items-center gap-2"
        >
          <FiSettings />
          Save Changes
        </button>
      </div>
    </form>
  );
};

export default SettingsForm;
