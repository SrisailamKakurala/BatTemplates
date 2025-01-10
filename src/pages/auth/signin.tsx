import { useForm } from 'react-hook-form';
import Input from '@/components/inputs/Input';
import Button from '@/components/buttons/Button';
import { FcGoogle } from 'react-icons/fc'; // Google icon
import { useState } from 'react';
import { signInWithPopup } from "firebase/auth";
import { auth, googleProvider } from "@/firebase/firebase.config";

// store
import useAuthStore from "@/store/authStore";

const SignIn = () => {

  const { signIn } = useAuthStore();

  const [hideForm, setHideForm] = useState<Boolean>(false);

  const { register, handleSubmit, formState: { errors } } = useForm();

  const onSubmit = async (data: any) => {
    console.log(data);
    // Custom authentication logic goes here
  }

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
        accessToken: await user.getIdToken(),
      };

      signIn(userData);
      console.log("User signed in: ", userData);
      setHideForm(true);

    } catch (error) {
      console.error("Google Sign-In Error: ", error);
    }
  };

  const handleBackgroundClick = () => {
    setHideForm(true); // Hide the form when clicking the background
  };

  const handleFormClick = (e: React.MouseEvent) => {
    e.stopPropagation(); // Prevent the click from propagating to the background
  };

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
        <h2 className="text-lg font-bold text-primary mb-1">Sign In</h2>
        <p className="text-gray-400 font-normal text-sm mb-4">Welcome back! Please sign in to your account</p>

        {/* Google Sign-In Button */}
        <Button
          icon={<FcGoogle size={20} />}
          label="Continue with Google"
          onClick={handleGoogleSignIn}
          className="cursor-pointer bg-whiteText text-primaryBg text-sm font-semibold w-full mb-4"
        />

        <div className="flex items-center w-full mb-2">
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
            className='w-full px-3 py-2 text-xs'
          />
          <Input
            {...register('password', { required: true })}
            type="password"
            placeholder="Password"
            error={errors.password?.type === 'required'}
            className='w-full px-3 py-2 text-xs'
          />
          <Button
            // type="submit"
            label="Sign In"
            className="bg-primary hover:bg-primaryHover text-whiteText focus:outline-none focus:ring-2 focus:ring-red-500 focus:ring-offset-2 transition duration-150 ease-in-out w-full mt-4"
          />
        </form>

        <p className="text-gray-400 font-normal text-xs mt-2">Don't have an account? <a href="#" className="text-red-500 underline">Sign up</a></p>
      </div>
    </div>
  );
};

export default SignIn;
