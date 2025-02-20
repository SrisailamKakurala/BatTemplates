import { FaUserCircle, FaGithub, FaLinkedin, FaTwitter, FaInstagram } from "react-icons/fa";

const ContributorCard = ({ user }: { user: any }) => {

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


    return (
        <div key={user.id} className="flex flex-col lg:flex-row items-center lg:gap-8 gap-4 p-6 rounded-lg shadow-lg bg-secondary text-white hover:shadow-xl transition-shadow duration-300 max-w-full overflow-hidden">
            {/* Profile Picture */}
            <div className="w-16 h-16 overflow-hidden rounded-full border-4 border-primary bg-gray-600 flex justify-center items-center">
                {user?.photoURL ? (
                    <img src={user?.photoURL} alt="Profile Avatar" className="w-full h-full object-cover" />
                ) : (
                    <FaUserCircle size={128} color="#6b7280" />
                )}
            </div>


            <div className="flex flex-col items-center lg:items-start">
                <h3 className="text-xl font-semibold">{user?.name}</h3>
                <p className="text-sm text-slate-400">{user?.email}</p>
                <p className="text-md text-primary"><span className="text-primary font-extrabold">Contributions: </span> {user?.contributions?.length || 1}</p>

                {/* Personal Links (Social Media Icons) */}
                <div className="mt-4 flex gap-4">
                {user?.personalLinks &&
                    Object.keys(user.personalLinks).map((key) => {
                        const link = user.personalLinks[key];
                        return (
                            <div key={key}> {/* Add key prop */}
                                {renderSocialLink(link.platform, link.url)}
                            </div>
                        );
                })}

                </div>
            </div>
        </div>

    );
};

export default ContributorCard;
