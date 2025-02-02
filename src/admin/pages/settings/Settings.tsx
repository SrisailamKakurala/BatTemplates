import React from "react";
import SettingsForm from "@/components/settings/SettingsForm";
import { FiSettings } from "react-icons/fi"; // Import FiSettings

const handleSettingsSubmit = (settings: {
  siteName: string;
  siteDescription: string;
  since: string;
  guidelines: string;
  logo?: File | null;
}) => {
  console.log("Form Submitted", settings);
  // Handle settings logic (e.g., send to backend or update state)
};

const Settings: React.FC = () => {
  return (
    <div className="flex flex-col h-screen overflow-y-scroll scroll-hide bg-dark lg:p-6 md:p-3 p-2">
      <h2 className="text-3xl text-primary font-bold mb-6 text-center flex items-center justify-start gap-2 ml-2">
        <FiSettings />
        Site Settings
      </h2>
      <SettingsForm onSubmit={handleSettingsSubmit} />
    </div>
  );
};

export default Settings;
