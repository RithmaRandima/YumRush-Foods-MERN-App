import React from "react";
import "./Header.css";
import { Background, Parallax } from "react-parallax";
import { mainImgObject } from "../../assets/assets";

const Header = () => {
  return (
    <div className="relative h-[90vh]">
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
          <div className="absolute inset-0 bg-gradient-to-t from-black/10 to-black/90"></div>
        </Background>
      </Parallax>

      {/* header content */}
      <div className="header-contents absolute top-1/3  pt-30 left-1/2 -translate-x-1/2 -translate-y-1/2 flex flex-col items-center p-4 text-center w-[900px]">
        <p className="text-amber-100 font-exd text-[15px] tracking-[4px] -mb-3">
          Indulge in Culinary Excellence
        </p>
        <h2 className="font-extrabold text-center text-[120px] text-amber-300">
          The Food Heaven
        </h2>
        <p className="text-white text-3 w-[600px] -mt-4  text-[19px] mb-10">
          we have propper passion for coocking.Love is the secret ingredient
          that makes all aou meals taste better and magical
        </p>
        <button className="btn">View Menu</button>
      </div>
    </div>
  );
};

export default Header;
