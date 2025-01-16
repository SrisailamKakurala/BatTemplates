import { useForm } from "react-hook-form";
import Input from "@/components/inputs/Input";
import Button from "@/components/buttons/Button";
import React, { useEffect } from "react";
import useGoogleAuth from "@/hooks/useGoogleAuth";
import useEmailAuth from "@/hooks/useEmailAuth";
import { FcGoogle } from "react-icons/fc";

// Importing useNavigate from react-router-dom
import { useNavigate } from "react-router-dom";

const AdminLogin: React.FC = () => {
  const { handleGoogleSignIn } = useGoogleAuth(); // Google SignIn hook
  const { loginWithEmail } = useEmailAuth(); // Email Auth hook

  const { register, handleSubmit, reset, formState: { errors } } = useForm();

  // Initialize useNavigate hook
  const navigate = useNavigate();

  // Check localStorage for auth state on initial render
  useEffect(() => {
    const authStorage = localStorage.getItem("auth-storage");
    if (authStorage) {
      const authData = JSON.parse(authStorage);
      console.log("authStorage on mount:", authData); // Debugging log
      if (authData.state.isAuthenticated && (authData.state.user.roles.includes("admin") || authData.state.user.roles.includes("member"))) {
        navigate("/admin/dashboard");
      }
    }
  }, [navigate]);

  const onSubmit = async (data: any, e: React.FormEvent) => {
    e.preventDefault(); // Prevent page reload
    try {
      await loginWithEmail(data.email, data.password);
      reset();

      // After successful login, check the auth-storage again
      const authStorage = await localStorage.getItem("auth-storage");
      if (authStorage) {
        const authData = JSON.parse(authStorage);
        console.log("authStorage after login:", authData); // Debugging log
        if (authData.state.isAuthenticated && (authData.state.user.roles.includes("admin") || authData.state.user.roles.includes("member"))) {
          navigate("/admin/dashboard");
        }
      }
    } catch (error) {
      console.error("Email Sign-In Error: ", error);
    }
  };

  const handleGoogleSuccess = async () => {
    await handleGoogleSignIn();
    
    // After Google login, check auth-storage
    const authStorage = localStorage.getItem("auth-storage");
    if (authStorage) {
      const authData = JSON.parse(authStorage);
      console.log("authStorage after Google login:", authData); // Debugging log
      if (authData.state.isAuthenticated && (authData.state.user.roles.includes("admin") || authData.state.user.roles.includes("member"))) {
        navigate("/admin/dashboard");
      }
    }
  };

  return (
    <div className="min-h-screen bg-primaryBg flex justify-center items-center">
      <div className="bg-black p-8 rounded-md shadow-lg w-full max-w-md flex flex-col justify-center items-center">
        <h2 className="text-2xl font-bold text-primary text-center mb-1">Admin Login</h2>
        <p className="text-gray-400 font-normal text-md mb-4">Welcome back! Please sign in to your account</p>

        {/* Google Sign-In Button */}
        <Button
          icon={<FcGoogle size={30} />}
          label="Continue with Google"
          onClick={handleGoogleSuccess}
          className="cursor-pointer bg-whiteText text-primaryBg text-xl font-semibold w-full mb-4"
        />

        <div className="flex items-center w-full mb-4">
          <div className="flex-grow h-[0.5px] bg-slate-500"></div>
          <p className="text-gray-400 mx-2">or</p>
          <div className="flex-grow h-[0.5px] bg-slate-500"></div>
        </div>

        {/* Form for email and password */}
        <form onSubmit={(e) => handleSubmit((data) => onSubmit(data, e))(e)} className="w-full">
          <Input
            {...register('email', { required: true })}
            type="email"
            placeholder="Email"
            error={errors.email?.type === 'required'}
            className="w-full h-12 px-3 py-2 mb-4"
          />
          <Input
            {...register('password', { required: true })}
            type="password"
            placeholder="Password"
            error={errors.password?.type === 'required'}
            className="w-full h-12 px-3 py-2 mb-4"
          />
          <Button
            label="Sign In"
            className="bg-primary hover:bg-primaryHover text-whiteText focus:outline-none focus:ring-2 focus:ring-red-500 focus:ring-offset-2 transition duration-150 ease-in-out w-full"
          />
        </form>

        <p className="flex text-gray-400 font-normal text-sm mt-3">
          Don't have an account? 
          <span className="text-red-500 underline ml-2 cursor-pointer">Sign up</span>
        </p>
      </div>
    </div>
  );
};

export default AdminLogin;
