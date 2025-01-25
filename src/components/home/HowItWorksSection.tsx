import { FaUsers, FaRocket } from 'react-icons/fa';
import { HiOutlineTemplate, HiOutlineClipboardList } from 'react-icons/hi';

const HowItWorksSection: React.FC = () => {
  const steps = [
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
  ];

  return (
    <section className="py-16 px-6 mb-8 rounded-lg bg-gradient-to-b from-[#c1c0c0] to-white">
      <div className="max-w-6xl mx-auto text-center">
        <h2 className="text-4xl font-bold text-primary mb-12">How It Works</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {steps.map((work, index) => (
            <div
              key={index}
              className="flex flex-col items-center text-center border-2 border-gradient-to-r from-primary to-secondary rounded-lg p-6 bg-primaryBg"
            >
              <div className="mb-4">{work.icon}</div>
              <p className="text-lg text-white">{work.step}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default HowItWorksSection;
