import React, { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { GiForkKnifeSpoon } from "react-icons/gi";

const Splash = () => {
  const navigate = useNavigate();

  useEffect(() => {
    const timer = setTimeout(() => {
      navigate("/");
    }, 2500); // 2.5s splash

    return () => clearTimeout(timer);
  }, [navigate]);

  return (
    <div className="h-screen w-full flex items-center justify-center bg-[#0b0b0b] relative overflow-hidden">
      {/* glowing background */}
      <div className="absolute w-[500px] h-[500px] bg-amber-500/10 blur-[120px] rounded-full" />

      <div className="text-center z-10 animate-fadeIn">
        {/* logo */}
        <div className="flex items-center justify-center gap-2 text-amber-400">
          <GiForkKnifeSpoon className="text-5xl animate-bounce" />
        </div>

        {/* brand */}
        <h1 className="text-3xl mt-4 tracking-[6px] font-light text-white">
          YumRush
        </h1>

        <p className="text-gray-400 text-sm mt-2">Fast. Fresh. Delivered.</p>

        {/* loading bar */}
        <div className="mt-6 w-48 h-1 bg-white/10 rounded-full overflow-hidden mx-auto">
          <div className="h-full w-full bg-amber-400 animate-loadingBar" />
        </div>
      </div>
    </div>
  );
};

export default Splash;
