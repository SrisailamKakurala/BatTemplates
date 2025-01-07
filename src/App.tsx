import Button from '@/components/buttons/Button';
import { useToast } from '@/hooks/useToast';


const App: React.FC = () => {
  const { addToast } = useToast()
  return (
      <div className="flex justify-center items-center h-screen bg-primaryBg">
        <Button
          label="Explore Folders"
          onClick={() => addToast('This is a success toast!', 'info')}
          className="cursor-pointer font-semibold bg-primary hover:bg-primaryHover ml-5"
        />
      </div>
  )
}

export default App


{/*

<Button
  label="Explore Folders"
  onClick={() => console.log('Button clicked')}
  className="cursor-pointer font-semibold bg-primary hover:bg-primaryHover ml-5" 
/>

// google button
import { FcGoogle } from 'react-icons/fc'
import Button from './components/buttons/Button'
<Button
        icon={<FcGoogle size={20} />}
        label="Continue with Google"
        onClick={() => console.log('Button clicked')}
        className="cursor-pointer bg-whiteText text-primaryBg text-sm font-semibold w-64"
      />

*/}