import { useState, useEffect } from "react";
import { FaUserCircle, FaGithub, FaLinkedin, FaTwitter, FaInstagram } from "react-icons/fa";

const ContributorCard = ({ user }: { user: any }) => {
    const [isLoading, setIsLoading] = useState(true); // Track if the image is loading

    useEffect(() => {
        console.log(user);
        console.log(user?.photoURL);
    }, [user]);

    // Helper function to render social media icons
    const renderSocialLink = (platform: string, url: string) => {
        switch (platform) {
            case "GitHub":
                return <a href={url} target="_blank" rel="noopener noreferrer"><FaGithub size={24} className="text-primary" /></a>;
            case "LinkedIn":
                return <a href={url} target="_blank" rel="noopener noreferrer"><FaLinkedin size={24} className="text-primary" /></a>;
            case "X":
                return <a href={url} target="_blank" rel="noopener noreferrer"><FaTwitter size={24} className="text-primary" /></a>;
            case "Instagram":
                return <a href={url} target="_blank" rel="noopener noreferrer"><FaInstagram size={24} className="text-primary" /></a>;
            default:
                return null;
        }
    };

    // Handle image load event
    const handleImageLoad = () => {
        setIsLoading(false); // Set loading to false once the image is loaded
    };

    return (
        <div key={user.id} className="flex flex-col lg:flex-row items-center lg:gap-8 gap-4 p-6 rounded-lg shadow-lg bg-secondary text-white hover:shadow-xl transition-shadow duration-300 max-w-full overflow-hidden">
            {/* Profile Picture */}
            <div className="w-16 h-16 rounded-full border-4 border-primary bg-gray-600 flex justify-center items-center">
                {isLoading ? (
                    <FaUserCircle size={64} color="#6b7280" /> // Adjusted size for better visibility
                ) : (
                    user?.photoURL && <img src={user?.photoURL} alt="Profile Avatar" className="w-16 h-16 object-cover" onLoad={handleImageLoad} />
                )}
            </div>

            <div className="flex flex-col items-center lg:items-start">
                <h3 className="text-xl font-semibold">{user?.name}</h3>
                <p className="text-sm text-slate-400">{user?.email}</p>

                {/* Personal Links (Social Media Icons) */}
                <div className="mt-4 flex gap-4">
                    {user?.personalLinks &&
                        Object.keys(user.personalLinks).map((key) => {
                            const link = user.personalLinks[key];
                            return renderSocialLink(link.platform, link.url);
                        })}
                </div>
            </div>
        </div>

    );
};

export default ContributorCard;
