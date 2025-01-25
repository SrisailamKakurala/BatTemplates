import { FaGithub, FaTwitter, FaDiscord } from 'react-icons/fa';

const CommunitySection: React.FC = () => {
  return (
    <section className="py-16 px-6 mt-8 bg-gradient-to-b from-red-900 to-primary rounded-xl">
      <h2 className="text-4xl font-bold text-white text-center mb-6">
        Join Our Community
      </h2>
      <p className="text-lg text-gray-400 max-w-4xl mx-auto text-center leading-relaxed">
        BatTemplates is open source, and we invite developers around the world to contribute. Submit
        features, improve templates, or join the discussion on GitHub and Discord.
      </p>
      <div className="flex justify-center space-x-6 mt-6">
        <a
          href="https://github.com/your-repo"
          target="_blank"
          rel="noopener noreferrer"
          className="text-gray-300 hover:text-secondary duration-200"
        >
          <FaGithub size={32} />
        </a>
        <a
          href="https://twitter.com/your-handle"
          target="_blank"
          rel="noopener noreferrer"
          className="text-gray-300 hover:text-secondary duration-200"
        >
          <FaTwitter size={32} />
        </a>
        <a
          href="https://discord.gg/your-invite"
          target="_blank"
          rel="noopener noreferrer"
          className="text-gray-300 hover:text-secondary duration-200"
        >
          <FaDiscord size={32} />
        </a>
      </div>
    </section>
  );
};

export default CommunitySection;
