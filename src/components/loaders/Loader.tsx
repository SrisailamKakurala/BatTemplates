import React from 'react';
import Lottie from 'react-lottie';
import loaderAnimation from '../../assets/animations/loaderAnimation.json';

const Loader: React.FC = () => {
  const defaultOptions = {
    loop: true,
    autoplay: true,
    animationData: loaderAnimation,
    rendererSettings: {
      preserveAspectRatio: 'xMidYMid slice'
    }
  };

  return (
    <div className="flex justify-center items-center h-screen w-full bg-primaryBg ">
      <Lottie options={defaultOptions} height={90} width={90} />
    </div>
  );
};

export default Loader;