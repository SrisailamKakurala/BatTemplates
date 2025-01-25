import React from 'react';
import HeroSection from '@/components/home/HeroSection';
import WhatIsSection from '@/components/home/WhatIsSection';
import FeaturesSection from '@/components/home/FeaturesSection';
import HowItWorksSection from '@/components/home/HowItWorksSection';
import CommunitySection from '@/components/home/CommunitySection';
import Footer from '@/components/home/Footer';

const Home: React.FC = () => {
  return (
    <div className="flex flex-col w-full h-full lg:px-12 md:px-8 px-4 overflow-y-scroll scroll-hide bg-darkBackground text-whiteText">
      <HeroSection />
      <WhatIsSection />
      <FeaturesSection />
      <HowItWorksSection />
      <CommunitySection />
      <Footer />
    </div>
  );
};

export default Home;
