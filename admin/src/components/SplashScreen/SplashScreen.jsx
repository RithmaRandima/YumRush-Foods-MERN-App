import React, { useEffect, useState } from "react";

const SplashScreen = ({ onFinish }) => {
  const [fadeOut, setFadeOut] = useState(false);

  useEffect(() => {
    const timer = setTimeout(() => {
      setFadeOut(true);

      setTimeout(() => {
        onFinish();
      }, 500);
    }, 2000);

    return () => clearTimeout(timer);
  }, [onFinish]);

  return (
    <div
      className={`fixed inset-0 z-[100] flex flex-col items-center justify-center bg-[#0b0b0b] transition-opacity duration-500 ${
        fadeOut ? "opacity-0" : "opacity-100"
      }`}
    >
      {/* logo */}
      <div className="text-center">
        <h1 className="text-3xl tracking-[6px] text-amber-400 font-light">
          YumRush
        </h1>

        <p className="text-xs text-gray-500 mt-2">Admin Dashboard Loading...</p>
      </div>

      {/* loader */}
      <div className="mt-6 w-24 h-[2px] bg-white/10 overflow-hidden rounded-full">
        <div className="h-full w-1/2 bg-amber-400 animate-[loading_1s_ease-in-out_infinite]"></div>
      </div>

      {/* animation */}
      <style>
        {`
          @keyframes loading {
            0% { transform: translateX(-100%); }
            50% { transform: translateX(50%); }
            100% { transform: translateX(200%); }
          }
        `}
      </style>
    </div>
  );
};

export default SplashScreen;
