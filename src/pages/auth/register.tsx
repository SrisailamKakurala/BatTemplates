import { useForm } from 'react-hook-form';
import Input from '@/components/inputs/Input';
import Button from '@/components/buttons/Button';
import { FcGoogle } from 'react-icons/fc';
import { useState } from 'react';
import { signInWithPopup } from "firebase/auth";
import { auth, googleProvider } from "@/firebase/firebase.config";

// store
import useAuthStore from "@/store/authStore";
import useModalStore from '@/store/modalStore';

const Register = () => {
  const { signIn } = useAuthStore();
  const { openModal, activeModal, closeModal } = useModalStore();

  const [hideForm, setHideForm] = useState<boolean>(false);

  const { register, handleSubmit, formState: { errors } } = useForm();

  const onSubmit = async (data: any) => {
    console.log(data);
  };

  const handleGoogleSignIn = async () => {
    try {
      const result = await signInWithPopup(auth, googleProvider);
      const user = result.user;

      // Extracting necessary fields
      const userData = {
        id: user.uid,
        name: user.displayName,
        email: user.email!,
        photoURL: user.photoURL,
        emailVerified: user.emailVerified,
      };

      const accessToken = await user.getIdToken();

      document.cookie = `accessToken=${accessToken}; path=/; max-age=3600; samesite=strict`;

      signIn({ ...userData });
      console.log("User signed in: ", userData);
      setHideForm(true);
    } catch (error) {
      console.error("Google Sign-In Error: ", error);
    }
  };

  const handleBackgroundClick = () => {
    closeModal();
    setHideForm(true); // Hide the form when clicking the background
  };

  const handleFormClick = (e: React.MouseEvent) => {
    e.stopPropagation(); // Prevent the click from propagating to the background
  };

  // Render modal only if `activeModal` is "register"
  if (activeModal !== 'register') return null;

  return (
    <div
      onClick={handleBackgroundClick}
      className="h-screen w-full bg-black bg-opacity-50 absolute flex justify-center items-center z-50"
      style={{ display: hideForm ? 'none' : 'flex' }}
    >
      <div
        onClick={handleFormClick}
        className="bg-primaryBg px-8 py-5 rounded-md shadow-lg lg:w-1/3 md:w-1/2 w-[80%] flex flex-col items-center"
      >
        <h2 className="text-2xl font-bold text-primary mb-1">Create Account</h2>
        <p className="text-gray-400 font-normal text-lg mb-4">Join our community today</p>

        <Button
          icon={<FcGoogle size={30} />}
          label="Continue with Google"
          onClick={handleGoogleSignIn}
          className="cursor-pointer bg-whiteText text-primaryBg text-xl font-semibold w-full mb-4"
        />

        <div className="flex items-center w-full mb-4">
          <div className="flex-grow h-[0.5px] bg-slate-500"></div>
          <p className="text-gray-400 mx-2">or</p>
          <div className="flex-grow h-[0.5px] bg-slate-500"></div>
        </div>

        <form onSubmit={handleSubmit(onSubmit)} className='w-full'>
          <Input
            {...register('fullName', { required: true })}
            type="text"
            placeholder="Full Name"
            error={errors.fullName?.type === 'required'}
            className='w-full px-4 py-4 h-12'
          />
          <Input
            {...register('email', { required: true })}
            type="email"
            placeholder="Email"
            error={errors.email?.type === 'required'}
            className='w-full px-4 py-4 h-12'
          />
          <Input
            {...register('password', { required: true })}
            type="password"
            placeholder="Password"
            error={errors.password?.type === 'required'}
            className='w-full px-4 py-4 h-12'
          />
          <Button
            label="Create Account"
            className="bg-primary hover:bg-primaryHover text-whiteText focus:outline-none focus:ring-2 focus:ring-red-500 focus:ring-offset-2 transition duration-150 ease-in-out w-full mt-6"
          />
        </form>

        <p className="flex text-gray-400 font-normal text-sm mt-4">Already have an account? <p onClick={() => openModal('signin')} className="text-red-500 underline ml-2 cursor-pointer">Sign in</p></p>
      </div>
    </div>
  );
};

export default Register;
