import Logo, { LogoMobile } from '@/components/logo/Logo';
import Button from '@/components/buttons/Button';
import { FaGithub, FaTwitter, FaDiscord, FaFolderOpen, FaUsers, FaRocket } from 'react-icons/fa';
import { HiOutlineTemplate, HiOutlineClipboardList } from 'react-icons/hi';
import { useNavigate } from 'react-router-dom';
import useModalStore from '@/store/modalStore';
import useAuthStore from '@/store/authStore';

const Home: React.FC = () => {
  const navigate = useNavigate();
  const { openModal } = useModalStore();
  const { isAuthenticated } = useAuthStore();

  return (
    <div className="flex flex-col w-full h-full overflow-y-scroll scroll-hide bg-darkBackground text-whiteTextlg:px-12 md:px-6 px-3">
      {/* Hero Section */}
      <div className="flex flex-col justify-center items-center w-full min-h-screen">
        {/* SignIn and Register buttons - Only visible if not authenticated */}
        {!isAuthenticated && (
          <div className="flex space-x-3 absolute top-4 right-4">
            <Button
              label="Sign In"
              onClick={() => openModal('signin')}
              className="bg-secondaryButton hover:bg-secondaryButtonHover text-xl text-whiteText font-semibold text-opacity-90 duration-200"
            />
            <Button
              label="Register"
              onClick={() => openModal('register')}
              className="bg-primary hover:bg-primaryHover text-xl text-whiteText font-semibold text-opacity-90 duration-200"
            />
          </div>
        )}

        {/* Statement */}
        <h1 className="md:text-[5vw] text-[6vw]  font-bolder text-whiteText font-lilitaOne">
          Unleash the <span className="text-primary">Power</span> of Instant
        </h1>
        <h1 className="md:text-[5vw] text-[6vw] font-bolder text-whiteText font-lilitaOne">
          <span className="text-primary">Project KickStarts</span> with
        </h1>
        <Logo classNames="md:h-20 h-16 w-auto" />

        {/* Buttons - Only visible if authenticated */}
        <div className="md:flex md:flex-row flex-col gap-2 mt-2">
          <Button
            label="Explore Templates"
            onClick={() => navigate('/templates')}
            className="bg-secondaryButton hover:bg-secondaryButtonHover text-xl text-whiteText font-semibold text-opacity-90 duration-200"
          />
          <Button
            label="Explore Structures"
            onClick={() => navigate('/folders')}
            className="md:mt-0 mt-2 bg-primary hover:bg-primaryHover text-xl text-whiteText font-semibold text-opacity-90 duration-200"
          />
        </div>
      </div>

      {/* What is Section */}
      <section className="py-16 lg:px-12 md:px-8 px-6 border-4 border-primary rounded-lg text-white">
        <div className="max-w-6xl mx-auto text-center">
          <h2 className="text-4xl font-bold mb-6">What is BatTemplates?</h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 items-center">
            <div className="md:col-span-2 text-left space-y-4">
              <p className="text-lg text-gray-300">
                BatTemplates is your go-to solution for kickstarting projects with pre-built folder
                structures and templates. Designed for developers, it saves time and ensures your
                projects start off on the right track.
              </p>
              <p className="text-lg text-gray-300">
                Collaborate with developers worldwide in an open-source community to enhance
                templates, suggest features, and improve project management tools.
              </p>
            </div>
            <div className="flex justify-center md:col-span-1">
              <LogoMobile />
            </div>
          </div>
        </div>
      </section>


      {/* Features Section */}
      <section className="py-16 px-6">
        <div className="text-center mb-8">
          <h2 className="text-4xl font-bold text-primary">Features</h2>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-6xl mx-auto">
          {[
            {
              title: 'Ready-to-Use Templates',
              desc: 'Start projects instantly with optimized templates for frameworks like React, Next.js, and more.',
              icon: <HiOutlineTemplate size={48} className="text-primary mx-auto" />,
            },
            {
              title: 'Folder Structures',
              desc: 'Clean and professional folder layouts to keep your code organized.',
              icon: <FaFolderOpen size={48} className="text-primary mx-auto" />,
            },
            {
              title: 'Open Source',
              desc: 'Join our community and help improve BatTemplates for developers worldwide.',
              icon: <FaUsers size={48} className="text-primary mx-auto" />,
            },
          ].map((feature, index) => (
            <div
              key={index}
              className="bg-gradient-to-t from-secondary to-secondaryHover p-6 rounded-lg shadow-md text-center"
            >
              <div className="mb-4">{feature.icon}</div> {/* Removed the text-center here */}
              <h3 className="text-2xl font-bold text-primary mb-4">{feature.title}</h3>
              <p className="text-gray-300">{feature.desc}</p>
            </div>
          ))}
        </div>
      </section>


      {/* How It Works Section */}
      <section className="py-16 px-6 mb-8 border-4 rounded-lg bg-gradient-to-b from-[#949191] to-slate-100">
        <div className="max-w-6xl mx-auto text-center">
          <h2 className="text-4xl font-bold text-primary mb-12">How It Works</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {[
              {
                step: 'Sign up or log in to your account.',
                icon: <FaUsers size={48} className="text-primary" />,
              },
              {
                step: 'Browse through templates and folder structures.',
                icon: <HiOutlineTemplate size={48} className="text-primary" />,
              },
              {
                step: 'Download and customize templates to match your needs.',
                icon: <HiOutlineClipboardList size={48} className="text-primary" />,
              },
              {
                step: 'Focus on coding instead of setting up.',
                icon: <FaRocket size={48} className="text-primary" />,
              },
            ].map((work, index) => (
              <div key={index} className="flex flex-col items-center text-center border-2 border-gradient-to-r from-primary to-secondary rounded-lg p-6 bg-primaryBg">
                <div className="mb-4">{work.icon}</div>
                <p className="text-lg text-white">{work.step}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Community Section */}
      <section className="py-16 px-6 mt-8 bg-gradient-to-b from-red-900 to-primary rounded-xl">
        <h2 className="text-4xl font-bold text-white text-center mb-6">
          Join Our Community
        </h2>
        <p className="text-lg text-gray-400 max-w-4xl mx-auto text-center leading-relaxed">
          BatTemplates is open source, and we invite developers around the
          world to contribute. Submit features, improve templates, or join the
          discussion on GitHub and Discord.
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

      {/* Footer */}
      <footer className="py-6 bg-darkBackground">
        <div className="max-w-6xl mx-auto flex flex-col md:flex-row items-center justify-between px-6">
          <Logo classNames="h-12 w-auto mb-4 md:mb-0" />
          <p className="text-sm text-gray-300">
            © {new Date().getFullYear()} BatTemplates. All rights reserved.
          </p>
          <div className="flex space-x-4">
            <a
              href="https://github.com/your-repo"
              target="_blank"
              rel="noopener noreferrer"
              className="text-gray-300 hover:text-primary duration-200"
            >
              GitHub
            </a>
            <a
              href="/contribute"
              className="text-gray-300 hover:text-primary duration-200"
            >
              Contribute
            </a>
            <a
              href="/privacy"
              className="text-gray-300 hover:text-primary duration-200"
            >
              Privacy Policy
            </a>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default Home;
