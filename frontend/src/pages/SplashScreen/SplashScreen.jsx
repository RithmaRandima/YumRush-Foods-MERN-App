import React, { useEffect, useState } from "react";

const SplashScreen = ({ loading }) => {
  const [fadeOut, setFadeOut] = useState(false);
  const [progress, setProgress] = useState(0);

  // simulate progress while loading is true
  useEffect(() => {
    if (!loading) return;

    setProgress(0);

    const interval = setInterval(() => {
      setProgress((prev) => {
        if (prev >= 100) return 100;
        return prev + 2;
      });
    }, 25);

    return () => clearInterval(interval);
  }, [loading]);

  // when loading finishes → fade out
  useEffect(() => {
    if (!loading) {
      setProgress(100);

      const timer = setTimeout(() => {
        setFadeOut(true);
      }, 200);

      return () => clearTimeout(timer);
    }
  }, [loading]);

  return (
    <div
      className={`fixed inset-0 z-[100] flex flex-col items-center justify-center bg-[#0b0b0b] px-4 transition-opacity duration-500 ${
        fadeOut ? "opacity-0 pointer-events-none" : "opacity-100"
      }`}
    >
      {/* logo */}
      <div className="text-center">
        <h1 className="text-2xl sm:text-3xl md:text-4xl tracking-[4px] sm:tracking-[6px] text-amber-400 font-light">
          YumRush
        </h1>
        <p className="text-[10px] sm:text-xs text-gray-500 mt-2">
          The Food Heaven
        </p>
      </div>

      {/* loader */}
      <div className="mt-6 w-20 sm:w-24 md:w-28 h-[2px] bg-white/10 overflow-hidden rounded-full">
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
