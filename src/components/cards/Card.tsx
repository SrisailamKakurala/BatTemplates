import React, { useState, useEffect } from "react";
import Button from "@/components/buttons/Button";
import formatDate from "@/utils/formatDate";
import { FaGithub, FaTags, FaCode, FaCheckCircle, FaThumbsUp, FaTimes, FaExclamationTriangle, FaFlag,} from "react-icons/fa";
import FlagModal from "@/components/modals/FlagModal";
import { approveTemplate } from "@/firebase/services/adminServices/template.sevice"; // Import the approve service
import { useToast } from "@/hooks/ui/useToast";
import { userTemplateProps } from "@/constants/interfaces";


const Card: React.FC<userTemplateProps> = ({
  id,
  title,
  category,
  createdAt,
  createdBy,
  description,
  githubLink,
  isApproved,
  type,
  techStack,
}) => {
  const [isFlagModalOpen, setIsFlagModalOpen] = useState(false);
  const [isApproving, setIsApproving] = useState(false); // Track approval state
  const [timeLeft, setTimeLeft] = useState(5); // Timer countdown
  const [isActionTaken, setIsActionTaken] = useState(false); // Track if action (approve/reject) is taken
  const [actionType, setActionType] = useState<"approved" | "rejected" | null>(null); // Track the type of action
  const { addToast } = useToast(); // Use the toast hook

  useEffect(() => {
    let timer: NodeJS.Timeout;

    if (isApproving && timeLeft > 0) {
      // Start the countdown
      timer = setInterval(() => {
        setTimeLeft((prev) => prev - 1);
      }, 1000);
    } else if (isApproving && timeLeft === 0) {
      // Approve the template after the timer completes
      approveTemplate(id)
        .then(() => {
          addToast("Template approved successfully!", "success");
          console.log("Template approved:", id);
          setIsActionTaken(true); // Mark action as taken
          setActionType("approved"); // Set action type to "approved"
        })
        .catch((error) => {
          addToast("Failed to approve template.", "error");
          console.error("Error approving template:", error);
        })
        .finally(() => {
          setIsApproving(false); // Reset the approval state
        });
    }

    // Clear the interval when the component unmounts or when the timer completes
    return () => clearInterval(timer);
  }, [isApproving, timeLeft, id, addToast]);

  const handleReviewClick = () => {
    window.open(githubLink, "_blank");
  };

  const handleApprove = () => {
    setIsApproving(true); // Start the approval process
    setTimeLeft(5); // Reset the timer
  };

  const handleCancelApproval = () => {
    setIsApproving(false); // Cancel the approval process
    setTimeLeft(5); // Reset the timer
    addToast("Approval canceled.", "info");
  };

  const handleReject = () => {
    if (window.confirm("Have you reviewed the submission thoroughly? Press OK to reject.")) {
      addToast("Template rejected.", "warning");
      console.log("Rejected");
      setIsActionTaken(true); // Mark action as taken
      setActionType("rejected"); // Set action type to "rejected"
    }
  };

  const handleFlagClick = () => {
    setIsFlagModalOpen(true);
  };

  const handleFlagSubmit = (reason: string) => {
    console.log("Flagged Reason:", reason);
    addToast("Template flagged successfully.", "info");
  };

  return (
    <div className="bg-secondary w-full p-4 md:p-6 rounded-lg shadow-lg mb-6 relative">
      <div className="flex flex-col md:flex-row justify-between items-start">
        <div>
          <h1 className="text-2xl md:text-3xl font-bold text-primary">{title}</h1>
          <h3 className="text-sm md:text-md text-gray-400 mt-1">
            Submitted by {createdBy} on {formatDate(createdAt / 1000)}
          </h3>
        </div>
        <Button
          label="Review"
          onClick={handleReviewClick}
          className="bg-blue-500 text-white hover:bg-blue-600 duration-200 mt-4 md:mt-0"
          icon={<FaGithub className="mr-2" />}
        />
      </div>
      <p className="text-sm text-gray-300 mt-3">{description}</p>
      <div className="mt-3 space-y-2">
        {/* Category with standout color */}
        <div className="flex items-center">
          <FaTags className="text-purple-500 mr-2" />
          <span className="text-sm text-purple-500">Category: {category}</span>
        </div>

        {/* Tech Stack with standout color */}
        <div className="flex items-center">
          <FaCode className="text-blue-500 mr-2" />
          <span className="text-sm text-blue-500">Tech Stack: {techStack}</span>
        </div>

        {/* Status with standout color */}
        <div className="flex items-center">
          {isApproved ? (
            <FaCheckCircle className="text-green-500 mr-2" />
          ) : (
            <FaCheckCircle className="text-gray-500 mr-2" />
          )}
          <span className={`text-sm ${isApproved ? "text-green-500" : "text-gray-500"}`}>
            Status: {isApproved ? "Approved" : "Pending Approval"}
          </span>
        </div>
      </div>

      {/* Caution Message */}
      <div className="mt-2 flex items-center text-sm text-yellow-600">
        <FaExclamationTriangle className="mr-2" />
        <span>Please review the submission before approving or rejecting.</span>
      </div>

      {/* Approve and Reject Buttons or Action Taken Message */}
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

      {/* Flag Icon at Bottom-Right */}
      <button
        onClick={handleFlagClick}
        className="absolute right-4 top-4 md:bottom-4 md:top-auto text-white bg-primary p-2 rounded-md duration-200"
      >
        <FaFlag className="text-xl" />
      </button>

      {/* Flag Modal */}
      <FlagModal
        isOpen={isFlagModalOpen}
        onClose={() => setIsFlagModalOpen(false)}
        onSubmit={handleFlagSubmit}
        type={type}
      />
    </div>
  );
};

export default Card;