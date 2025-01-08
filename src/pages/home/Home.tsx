import React from 'react'

const Home: React.FC = () => {
  return (
    <div className="p-8 flex flex-col justify-center items-center">
      <blockquote className="text-4xl text-white font-semibold mb-4">
        "Your journey begins with a single step."
      </blockquote>
      <p className="text-xl text-primary">
        — Unknown
      </p>
    </div>
  )
}

export default Home
