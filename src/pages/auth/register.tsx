import { useForm, SubmitHandler } from "react-hook-form";
import Input from "@/components/inputs/Input";
import Button from "@/components/buttons/Button";
import { FcGoogle } from "react-icons/fc";
import useGoogleAuth from "@/hooks/useGoogleAuth";
import useEmailAuth from "@/hooks/useEmailAuth";
import useModalStore from "@/store/modalStore";
import { useCallback } from "react";

interface RegisterFormData {
  fullName: string;
  email: string;
  password: string;
}

const Register = () => {
  const { handleGoogleSignIn } = useGoogleAuth();
  const { registerWithEmail } = useEmailAuth();
  const { activeModal, closeModal, openModal } = useModalStore();

  const { register, handleSubmit, reset, formState: { errors } } = useForm<RegisterFormData>();

  const onSubmit: SubmitHandler<RegisterFormData> = useCallback(async (data) => {
    try {
      const { fullName, email, password } = data;
      await registerWithEmail(fullName, email, password);
      reset();
      closeModal();
    } catch (error) {
      console.error("Registration error", error);
    }
  }, [registerWithEmail, reset]);

  if (activeModal !== "register") return null;

  return (
    <div onClick={closeModal} className="h-screen w-full bg-black bg-opacity-50 absolute flex justify-center items-center z-50">
      <div onClick={(e) => e.stopPropagation()} className="bg-primaryBg px-8 py-5 rounded-md shadow-lg lg:w-1/3 md:w-1/2 w-[80%] flex flex-col items-center">
        <h2 className="text-2xl font-bold text-primary mb-1">Create Account</h2>
        <p className="text-gray-400 font-normal text-lg mb-4">Join our community today</p>

        <Button
          icon={<FcGoogle size={30} />}
          label="Continue with Google"
          onClick={handleGoogleSignIn}
          className="cursor-pointer bg-whiteText text-primaryBg md:text-xl text-md font-semibold w-full mb-4"
        />

        <div className="flex items-center w-full mb-4">
          <div className="flex-grow h-[0.5px] bg-slate-500"></div>
          <p className="text-gray-400 mx-2">or</p>
          <div className="flex-grow h-[0.5px] bg-slate-500"></div>
        </div>

        <form onSubmit={handleSubmit(onSubmit)} className="w-full">
          <Input {...register("fullName", { required: true })} type="text" placeholder="Full Name" error={errors.fullName?.type === "required"} className="w-full px-4 py-4 h-12" />
          <Input {...register("email", { required: true })} type="email" placeholder="Email" error={errors.email?.type === "required"} className="w-full px-4 py-4 h-12" />
          <Input {...register("password", { required: true })} type="password" placeholder="Password" error={errors.password?.type === "required"} className="w-full px-4 py-4 h-12" />
          <Button label="Create Account" className="bg-primary hover:bg-primaryHover text-xl text-whiteText w-full mt-6" />
        </form>

        <p className="flex text-gray-400 font-normal text-sm mt-4">
          Already have an account? 
          <span onClick={() => openModal("signin")} className="text-red-500 underline ml-2 cursor-pointer">Sign in</span>
        </p>
      </div>
    </div>
  );
};

export default Register;
