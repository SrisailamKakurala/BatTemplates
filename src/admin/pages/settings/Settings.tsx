import React from "react";
import SettingsForm from "@/components/settings/SettingsForm";

const handleSettingsSubmit = (settings: {
  siteName: string;
  siteDescription: string;
  since: string;
  guidelines: string;
  logo: File | null;
}) => {
  console.log("Form Submitted", settings);
  // Handle settings logic (e.g., send to backend or update state)
};

const Settings: React.FC = () => {
  return (
    <div className="min-h-screen bg-dark flex items-center justify-center py-5">
      <SettingsForm onSubmit={handleSettingsSubmit} />
    </div>
  );
};

export default Settings;
