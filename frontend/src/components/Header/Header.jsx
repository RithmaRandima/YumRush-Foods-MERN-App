import React from "react";
import "./Header.css";
import { Background, Parallax } from "react-parallax";
import { mainImgObject } from "../../assets/assets";
import { useNavigate } from "react-router-dom";

const Header = () => {
  const navigate = useNavigate();
  return (
    <div className="relative h-[80vh] md:h-[90vh] overflow-hidden">
      <Parallax
        strength={200}
        blur={100}
        className="w-full h-full flex items-center justify-center"
      >
        <Background className="custom-bg w-[100vw] h-[200vh] md:h-full relative">
          <img
            src={mainImgObject.HomeBgImage}
            alt="fill murray"
            className="w-[100vw] h-full object-cover"
          />
          {/* Overlay */}
          <div className="absolute inset-0 bg-gradient-to-t from-black md:via-black/50 via-black/70 to-black/20"></div>
        </Background>
      </Parallax>

      {/* header content */}
      <div className="header-contents absolute -mt-8 md:mt-0 top-1/2  left-1/2 -translate-x-1/2 -translate-y-1/2 flex flex-col items-center p-4 text-center w-full md:w-[900px]">
        <p className="text-amber-100 font-exd text-[14px] sm:text-[16px] tracking-[3px] sm:tracking-[4px] mb-3">
          Indulge in Culinary Excellence
        </p>

        <h2 className="font-extrabold text-center text-[63px] sm:text-[70px] md:text-[120px] text-amber-300 leading-none">
          The Food Heaven
        </h2>

        <p className="text-white text-[14px] sm:text-[16px] md:text-[19px] w-full md:w-[600px] sm:-mt-4 mb-3 sm:mb-10">
          we have propper passion for coocking. Love is the secret ingredient
          that makes all aou meals taste better and magical
        </p>

        <button className="btn" onClick={() => navigate("/menu")}>
          View Menu
        </button>
      </div>
    </div>
  );
};

export default Header;
