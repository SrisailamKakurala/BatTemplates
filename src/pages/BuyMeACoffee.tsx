import React from "react";
import useModalStore from "@/store/modalStore";
import qr from "@/assets/images/bmc_qr.png"; // Ensure the path is correct

const BuyMeACoffee: React.FC = () => {
  const { activeModal, closeModal } = useModalStore();

  if (activeModal !== "donate") return null;

  return (
    <div
      onClick={closeModal}
      className="h-screen absolute w-full bg-black bg-opacity-50 top-0 left-0 flex justify-center items-center z-50"
    >
      <div
        onClick={(e) => e.stopPropagation()} // Prevent closing when clicking inside
        className="bg-primaryBg px-8 py-6 rounded-md shadow-lg flex flex-col items-center"
      >
        <h2 className="text-2xl font-bold text-primary mb-3">Support Me</h2>

        {/* QR Code */}
        <img src={qr} alt="Buy me a coffee" className="w-60 h-60" />

        {/* Divider */}
        <div className="flex items-center w-full my-4">
          <div className="flex-grow h-[0.5px] bg-slate-500"></div>
          <p className="text-gray-400 mx-2">or</p>
          <div className="flex-grow h-[0.5px] bg-slate-500"></div>
        </div>

        {/* Buy Me a Coffee Link */}
        <a
          href="https://buymeacoffee.com/battemplates"
          target="_blank"
          rel="noopener noreferrer"
          className="text-red-500 font-semibold text-lg underline"
        >
          Buy Me a Coffee
        </a>
        
      </div>
    </div>
  );
};

export default BuyMeACoffee;
