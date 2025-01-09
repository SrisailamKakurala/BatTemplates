import React from 'react'
import Logo from '@/components/logo/Logo'
import Button from '@/components/buttons/Button'
import { useNavigate } from 'react-router-dom'
import useModalStore from '@/store/modalStore'; // Import modal store

const Home: React.FC = () => {
  const navigate = useNavigate();
  const { openModal } = useModalStore(); // Access the store to trigger modals

  return (
    <div className="flex flex-col justify-center items-center w-full h-full">
      {/* signin and register buttons */}
      <div className="flex space-x-2 absolute top-4 right-4">
        <Button
          label='Sign In'
          onClick={() => openModal("signin")} // Open SignIn modal
          className='bg-secondaryButton hover:bg-secondaryButtonHover text-whiteText font-semibold text-opacity-90 duration-200'
        />
        <Button
          label='Register'
          onClick={() => openModal("register")} // Open Register modal
          className='bg-primary hover:bg-primaryHover text-whiteText font-semibold text-opacity-90 duration-200'
        />
      </div>

      {/* Statement */}
      <h1 className="text-[5vw] font-bolder text-whiteText font-lilitaOne">Unleash the <span className='text-primary'>Power</span> of Instant</h1>
      <h1 className="text-[5vw] font-bolder text-whiteText font-lilitaOne"><span className='text-primary'>Project KickStarts</span> with</h1>
      <Logo classNames='h-20 w-auto' />

      {/* Buttons */}
      <div className="flex space-x-2 mt-2">
        <Button
          label='Explore Templates'
          onClick={() => navigate('/templates')}
          className='bg-secondaryButton hover:bg-secondaryButtonHover text-whiteText font-semibold text-opacity-90 duration-200'
        />
        <Button
          label='Explore Structures'
          onClick={() => navigate('/folders')}
          className='bg-primary hover:bg-primaryHover text-whiteText font-semibold text-opacity-90 duration-200'
        />
      </div>
    </div>
  );
}

export default Home;
