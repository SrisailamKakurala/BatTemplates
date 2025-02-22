import React, { useState, useEffect } from "react";
import Button from "@/components/buttons/Button";
import formatDate from "@/utils/formatDate";
import { FaDownload, FaTags, FaCode, FaCheckCircle, FaThumbsUp, FaTimes, FaExclamationTriangle, FaFlag, FaFolder } from "react-icons/fa";
import FlagModal from "@/components/modals/FlagModal";
import { approveStructure } from "@/firebase/services/adminServices/folder.service"; // Approve service
import { useToast } from "@/hooks/ui/useToast";
import { Folder } from "@/constants/schema";
import { getUser } from "@/utils/localStorageUtil";
import { addLogToFirestore } from "@/firebase/services/adminServices/logService.service";
import MarkdownModal from "@/components/modals/MarkdownModal";

const StructureCard: React.FC<Folder> = ({
  id,
  title,
  category,
  createdAt,
  authorId,
  authorEmail,
  description,
  os,
  downloadLink,
  isApproved,
}) => {
  const [isFlagModalOpen, setIsFlagModalOpen] = useState(false);
  const [isApproving, setIsApproving] = useState(false);
  const [timeLeft, setTimeLeft] = useState(5);
  const [isActionTaken, setIsActionTaken] = useState(false);
  const [actionType, setActionType] = useState<"approved" | "rejected" | null>(null);
  const [isMarkdownOpen, setIsMarkdownOpen] = useState(false);
  const { addToast } = useToast();

  console.log("id: ", id, " title: ", title);

  useEffect(() => {
    const user = getUser();
    let timer: NodeJS.Timeout;

    if (isApproving && timeLeft > 0) {
      timer = setInterval(() => {
        setTimeLeft((prev) => prev - 1);
      }, 1000);
    } else if (isApproving && timeLeft === 0) {
      approveStructure(id, authorId, authorEmail, user?.email)
        .then(() => {
          addToast("Structure approved successfully!", "success");
          setIsActionTaken(true);
          setActionType("approved");
        })
        .catch((error) => {
          addToast("Failed to approve structure.", "error");
          console.error("Error approving structure:", error);
        })
        .finally(() => {
          setIsApproving(false);
        });
    }

    return () => clearInterval(timer);
  }, [isApproving, timeLeft, id, addToast]);

  const handleApprove = () => {
    setIsApproving(true);
    setTimeLeft(5);
  };

  const handleCancelApproval = () => {
    setIsApproving(false);
    setTimeLeft(5);
    addToast("Approval canceled.", "info");
  };

  const handleReject = () => {
    if (window.confirm("Have you reviewed the structure thoroughly? Press OK to reject.")) {
      addToast("Structure rejected.", "warning");

      const user = getUser();
      if (user) {
        addLogToFirestore({
          action: "❌ Structure Rejected",
          userId: user.id,
          userEmail: user.email,
          details: `Structure: ${id}\nRejected by: ${user?.email}`,
        });
      }

      setIsActionTaken(true);
      setActionType("rejected");
    }
  };

  const handleFlagClick = () => {
    setIsFlagModalOpen(true);
  };

  const handleDownload = () => {
    window.open(downloadLink, "_blank");
  };

  return (
    <div className="bg-secondary w-full p-4 md:p-6 rounded-lg shadow-lg mb-6 relative">
      <div className="flex flex-col md:flex-row justify-between items-start">
        <div>
          <h1 className="text-2xl md:text-3xl font-bold text-primary">{title}</h1>
          <h3 className="text-sm md:text-md text-gray-400 mt-1">
            Submitted by {authorEmail} on {formatDate(createdAt)}
          </h3>
        </div>
        <Button
          label="View Script"
          onClick={() => setIsMarkdownOpen(true)}
          className="bg-blue-500 text-white hover:bg-blue-600 duration-200 mt-4 md:mt-0"
          icon={<FaFolder className="mr-2" />}
        />
      </div>

      {/* 🆕 Markdown Preview Modal */}
      <MarkdownModal
        isOpen={isMarkdownOpen}
        onClose={() => setIsMarkdownOpen(false)}
        fileUrl={downloadLink} // File URL
      />

      <p className="text-sm text-gray-300 mt-3">{description}</p>
      <div className="mt-3 space-y-2">
        <div className="flex items-center">
          <FaTags className="text-purple-500 mr-2" />
          <span className="text-sm text-purple-500">Category: {category}</span>
        </div>
        <div className="flex items-center">
          <FaCode className="text-blue-500 mr-2" />
          <span className="text-sm text-blue-500">Operating System: {os}</span>
        </div>
        <div className="flex items-center">
          <FaCheckCircle className={isApproved ? "text-green-500 mr-2" : "text-gray-500 mr-2"} />
          <span className={`text-sm ${isApproved ? "text-green-500" : "text-gray-500"}`}>
            Status: {isApproved ? "Approved" : "Pending Approval"}
          </span>
        </div>
      </div>

      <div className="mt-2 flex items-center text-sm text-yellow-600">
        <FaExclamationTriangle className="mr-2" />
        <span>Please review the structure before approving or rejecting.</span>
      </div>

      <div className="mt-4 flex flex-col md:flex-row space-y-2 md:space-y-0 md:space-x-4">
        {isActionTaken ? (
          <div className="flex items-center space-x-3">
            <p className={`text-lg font-semibold ${actionType === "approved" ? "text-green-500" : "text-red-500"}`}>
              {actionType === "approved" ? "Approved" : "Rejected"}
            </p>
          </div>
        ) : isApproving ? (
          <div className="flex items-center space-x-3">
            <Button
              label={`Cancel Approval (${timeLeft}s)`}
              onClick={handleCancelApproval}
              className="bg-yellow-500 text-white hover:bg-yellow-600 duration-200"
            />
          </div>
        ) : (
          <>
            <Button
              label="Approve"
              onClick={handleApprove}
              className="bg-green-500 text-white hover:bg-green-600 duration-200"
              icon={<FaThumbsUp className="mr-2" />}
            />
            <Button
              label="Reject"
              onClick={handleReject}
              className="bg-red-500 text-white hover:bg-red-600 duration-200"
              icon={<FaTimes className="mr-2" />}
            />
          </>
        )}
      </div>

      <Button
        label="Download"
        onClick={handleDownload}
        className="bg-blue-500 text-white hover:bg-blue-600 duration-200 mt-4"
        icon={<FaDownload className="mr-2" />}
      />

      <button
        onClick={handleFlagClick}
        className="absolute right-4 top-4 md:bottom-4 md:top-auto text-white bg-primary p-2 rounded-md duration-200"
      >
        <FaFlag className="text-xl" />
      </button>

      <FlagModal
        isOpen={isFlagModalOpen}
        onClose={() => setIsFlagModalOpen(false)}
        type="structure"
        contentId={id}
        userId={authorId}
        title={title}
        source={downloadLink}
      />
    </div>
  );
};

export default StructureCard;
