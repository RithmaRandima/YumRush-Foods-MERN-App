import React from "react";
import "./Header.css";

const Header = () => {
  return (
    <div className="header rounded-2xl">
      <div className="header-contents absolute flex flex-col items-start max-w-[50%] bottom-[10%] left-[6vw]">
        <h2 className="font-semibold text-white ">
          Lorem ipsum dolor sit amet.
        </h2>
        <p className="text-white text-3">
          Lorem ipsum dolor sit amet consectetur adipisicing elit. Vero pariatur
          est dolore aperiam officia.
        </p>
        <button className="border-none text-[#747474] font-semibold px-6 py-3 bg-white rounded-full mt-3">
          View Menu
        </button>
      </div>
    </div>
  );
};

export default Header;
