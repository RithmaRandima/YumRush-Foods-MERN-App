import React from "react";
import "./Navbar.css";
import { GiForkKnifeSpoon } from "react-icons/gi";

const Navbar = () => {
  return (
    <div className="flex py-7 justify-between items-center px-[4%] bg-gradient-to-t from-black to-black/95 ">
      {/* logo */}
      <div>
        <div className="relative text-amber-300">
          <h1 className="text-amber-300 tracking-[4px] font-extralight text-[13px]">
            YumRush
          </h1>
          <GiForkKnifeSpoon className="absolute -right-7 -bottom-0 text-[30px]" />
        </div>
      </div>

      {/* user img */}
      <div>
        <p className="text-white text-[12px] font-semibold">
          Welcome to Admin Page of YumRush
        </p>
      </div>
    </div>
  );
};

export default Navbar;
