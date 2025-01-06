import Loader from './components/loaders/Loader'

const App = () => {
  return (
    <div className="flex justify-center items-center h-screen bg-primaryBg">
      <Loader />
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

*/}