import React from "react";
import { Link } from "react-router-dom";

const HomeMenuCard = ({ item, index }) => {
  return (
    <div key={index} className=" h-70 w-[90%] mx-auto">
      <Link to={"/menu"}>
        <div className="relative w-full h-60 hover:p-2 mx-auto duration-500  ">
          <img
            src={item.menu_bg}
            className="w-full h-full object-cover"
            alt=""
          />
          {/* <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/40 to-transparent"></div> */}
        </div>
        <h1 className="text-amber-100 text-center mt-3 font-exd text-[17px] tracking-[4px] -mb-3 ">
          {item.menu_name}
        </h1>
      </Link>
    </div>
  );
};

export default HomeMenuCard;
