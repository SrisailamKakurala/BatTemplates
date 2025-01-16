import Lottie from "react-lottie";
import { Link } from "react-router-dom";
import animationData from "@/assets/animations/404.json";

const NotFound: React.FC = () => {
  const defaultOptions = {
    loop: true,
    autoplay: true,
    animationData,
    rendererSettings: {
      preserveAspectRatio: "xMidYMid slice",
    },
  };

  return (
    <div className="flex flex-col items-center justify-center h-screen w-screen bg-black text-center">
      <div className="w-96 h-96">
        <Lottie options={defaultOptions} />
      </div>
      <h1 className="text-4xl font-bold -mb-8">Page Not Found</h1>
      <p className="text-lg text-gray-400 mb-6">
        The page you’re looking for might have been removed or is temporarily unavailable.
      </p>
      <Link
        to="/"
        className="px-6 py-3 bg-white text-black rounded-md shadow-md hover:bg-gray-200 transition-all"
      >
        Go Back to Home
      </Link>
    </div>
  );
};

export default NotFound;
