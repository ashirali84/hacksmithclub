import React from 'react';
import ReactDOM from 'react-dom';

const home = () => {
  return (
    <div className="text-white my-10  ">
      <style>
        {`
          @keyframes slideInLeft {
            0% {
              transform: translateX(-100%);
              opacity: 0;
            }
            100% {
              transform: translateX(0);
              opacity: 1;
            }
          }
          @keyframes slideInRight {
            0% {
              transform: translateX(100%);
              opacity: 0;
            }
            100% {
              transform: translateX(0);
              opacity: 1;
            }
          }
          .animate-slide-in-left {
            animation: slideInLeft 1.2s ease-out forwards;
          }
          .animate-slide-in-right {
            animation: slideInRight 1.2s ease-out forwards;
          }
        `}
      </style>
      <div className="text-blue-500 flex justify-center items-center font-bold">
        <h1 className="text-5xl">HACKSMITH CLUB</h1>
      </div>
      <div className="flex flex-col md:flex-row items-center justify-center space-y-10 md:space-y-0 md:space-x-20 my-10 md:my-36">
        <p className="w-full md:w-2xl text-lg sm:text-xl md:text-2xl text-blue-300 text-center animate-slide-in-left">The Hacksmith Club is proud to present its Capture The Flag (CTF) platform, 
          designed for cybersecurity enthusiasts and professionals alike. 
          This platform offers a dynamic and challenging environment where you can test and hone your hacking skills in a secure setting</p>
          <img className="border-2 border-blue-400 rounded-xl shadow-lg w-full max-w-sm md:max-w-md animate-slide-in-right" width={444} src='/poster.jpg'/>
      </div>
    </div>
  )
}

export default home
