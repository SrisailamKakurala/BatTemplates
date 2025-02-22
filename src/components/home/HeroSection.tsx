import React from 'react';
import Logo from '@/components/logo/Logo';
import Button from '@/components/buttons/Button';
import { useNavigate } from 'react-router-dom';
import useModalStore from '@/store/modalStore';
import useAuthStore from '@/store/authStore';

const HeroSection: React.FC = () => {
  const navigate = useNavigate();
  const { openModal } = useModalStore();
  const { isAuthenticated } = useAuthStore();

  return (
    <div className="flex flex-col justify-center items-center w-full min-h-screen">
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
      <h1 className="md:text-[5vw] text-[6vw] font-bolder text-whiteText font-lilitaOne">
        Unleash the <span className="text-primary">Power</span> of Instant
      </h1>
      <h1 className="md:text-[5vw] text-[6vw] font-bolder text-whiteText font-lilitaOne">
        <span className="text-primary">Project KickStarts</span> with
      </h1>
      <Logo classNames="md:h-20 h-16 w-auto" />
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
  );
};

export default HeroSection;
