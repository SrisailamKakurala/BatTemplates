import React from 'react';
import {LogoMobile} from '@/components/logo/Logo';

const WhatIsSection: React.FC = () => {
  return (
    <section className="py-16 lg:px-12 md:px-8 px-6 border-4 border-primary rounded-lg text-white">
      <div className="max-w-6xl mx-auto text-center">
        <h2 className="text-4xl font-bold mb-6">What is BatTemplates?</h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 items-center">
          <div className="md:col-span-2 md:text-left text-center space-y-4">
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
  );
};

export default WhatIsSection;
