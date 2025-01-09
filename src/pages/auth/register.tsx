import { useForm } from 'react-hook-form';
import Input from '@/components/inputs/Input';
import Button from '@/components/buttons/Button';
import { FcGoogle } from 'react-icons/fc';
import { useState } from 'react';

const Register = () => {

  const [hideForm, setHideForm] = useState<Boolean>(false);

  const { register, handleSubmit, formState: { errors } } = useForm();

  const onSubmit = async (data: any) => {
    console.log(data);
  }

  const handleBackgroundClick = () => {
    setHideForm(true);
  };

  const handleFormClick = (e: React.MouseEvent) => {
    e.stopPropagation();
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
        <h2 className="text-lg font-bold text-primary mb-1">Create Account</h2>
        <p className="text-gray-400 font-normal text-sm mb-4">Join our community today</p>

        <Button
          icon={<FcGoogle size={20} />}
          label="Continue with Google"
          onClick={() => console.log('Button clicked')}
          className="cursor-pointer bg-whiteText text-primaryBg text-sm font-semibold w-full mb-4"
        />

        <div className="flex items-center w-full mb-2">
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
            className='w-full px-3 py-2 text-xs'
          />
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
            label="Create Account"
            className="bg-primary hover:bg-primaryHover text-whiteText focus:outline-none focus:ring-2 focus:ring-red-500 focus:ring-offset-2 transition duration-150 ease-in-out w-full mt-4"
          />
        </form>

        <p className="text-gray-400 font-normal text-xs mt-2">Already have an account? <a href="#" className="text-red-500 underline">Sign in</a></p>
      </div>
    </div>
  );
};

export default Register;
