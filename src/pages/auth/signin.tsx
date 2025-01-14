import { useForm } from "react-hook-form";
import Input from "@/components/inputs/Input";
import Button from "@/components/buttons/Button";
import { useState } from "react";
import useGoogleAuth from "@/hooks/useGoogleAuth";
import useEmailAuth from "@/hooks/useEmailAuth";
import { FcGoogle } from "react-icons/fc";

// store
import useModalStore from "@/store/modalStore";

const SignIn = () => {
  const { openModal, activeModal, closeModal } = useModalStore();
  const { handleGoogleSignIn } = useGoogleAuth(); // Google SignIn hook
  const { loginWithEmail } = useEmailAuth(); // Email Auth hook

  const [hideForm, setHideForm] = useState<boolean>(false);

  const { register, handleSubmit, reset, formState: { errors } } = useForm();

  const onSubmit = async (data: any) => {
    try {
      await loginWithEmail(data.email, data.password);
      reset();
      closeModal();
    } catch (error) {
      console.error("Email Sign-In Error: ", error);
    }
  };

  const handleBackgroundClick = () => {
    closeModal();
    setHideForm(true); // Hide the form when clicking the background
  };

  const handleFormClick = (e: React.MouseEvent) => {
    e.stopPropagation(); // Prevent the click from propagating to the background
  };

  // Render modal only if `activeModal` is "signin"
  if (activeModal !== 'signin') return null;

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
        <h2 className="text-2xl font-bold text-primary mb-1">Sign In</h2>
        <p className="text-gray-400 font-normal text-md mb-4">Welcome back! Please sign in to your account</p>

        {/* Google Sign-In Button */}
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

        {/* Form for email and password */}
        <form onSubmit={handleSubmit(onSubmit)} className='w-full'>
          <Input
            {...register('email', { required: true })}
            type="email"
            placeholder="Email"
            error={errors.email?.type === 'required'}
            className='w-full h-12 px-3 py-2'
          />
          <Input
            {...register('password', { required: true })}
            type="password"
            placeholder="Password"
            error={errors.password?.type === 'required'}
            className='w-full h-12 px-3 py-2'
          />
          <Button
            label="Sign In"
            className="bg-primary hover:bg-primaryHover text-whiteText focus:outline-none focus:ring-2 focus:ring-red-500 focus:ring-offset-2 transition duration-150 ease-in-out w-full mt-6"
          />
        </form>

        <p className="flex text-gray-400 font-normal text-sm mt-3">
          Don't have an account? 
          <span onClick={() => openModal('register')} className="text-red-500 underline ml-2 cursor-pointer">Sign up</span>
        </p>
      </div>
    </div>
  );
};

export default SignIn;
