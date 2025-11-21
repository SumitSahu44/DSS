import React from 'react';
import Silk from './Silk'; // Assuming Silk component is in the same directory

const Hero = () => {
  return (
    <div className="h-screen relative overflow-hidden">
      {/* Silk component for the background effect */}
      <Silk
        speed={5}
        scale={1}
        color="#0078f0"
        noiseIntensity={1.5}
        rotation={0}
      />

      {/* Centered Text Overlay */}
      <div className="absolute inset-0 flex items-center justify-center text-center p-4">
        <div className="max-w-4xl">
          <h1 className="text-white text-5xl sm:text-6xl md:text-7xl lg:text-7xl font-bold leading-tight">
            <span className="block">Transform Your</span>
            {/* The primary, highlighted text */}
            <span className="block text-orange-400">
              <span className="inline-block relative">
               <i> Digital Marketing
                
                </i>
                {/* Underline effect */}
                {/* <span className="absolute left-0 bottom-0 h-1 bg-blue-400 w-full transform -translate-y-1"></span> */}
              </span>
            </span>
            <span className="block">Strategy</span>
          </h1>

          {/* Secondary, creative tagline */}
          <p className="mt-6 text-xl sm:text-2xl text-white font-light italic">
            <span className="block">We are the **Architects of Your Online Empire**</span>
            <span className="block text-gray-300 font-normal">— **Unlocking Next-Gen Growth with AI**</span>
          </p>
        </div>
      </div>
    </div>
  );
};

export default Hero;