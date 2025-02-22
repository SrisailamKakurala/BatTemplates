import React from 'react';
import { HiOutlineTemplate } from 'react-icons/hi';
import { FaFolderOpen, FaUsers } from 'react-icons/fa';

const FeaturesSection: React.FC = () => {
  const features = [
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
  ];

  return (
    <section className="py-16 px-6">
      <div className="text-center mb-8">
        <h2 className="text-4xl font-bold text-primary">Features</h2>
      </div>
      <div className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-6xl mx-auto">
        {features.map((feature, index) => (
          <div
            key={index}
            className="bg-gradient-to-t from-secondary to-secondaryHover p-6 rounded-lg shadow-md text-center"
          >
            <div className="mb-4">{feature.icon}</div>
            <h3 className="text-2xl font-bold text-primary mb-4">{feature.title}</h3>
            <p className="text-gray-300">{feature.desc}</p>
          </div>
        ))}
      </div>
    </section>
  );
};

export default FeaturesSection;
