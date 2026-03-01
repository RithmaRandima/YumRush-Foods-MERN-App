import React from "react";
import { Background, Parallax } from "react-parallax";
import { mainImgObject } from "../../assets/assets";

const Newsletter = () => {
  return (
    <div className="relative h-[70vh] ">
      <Parallax
        strength={200}
        blur={100}
        className="w-full h-full flex items-center justify-center"
      >
        <Background className="custom-bg w-[100vw] h-[200vh] md:h-full relative">
          <img
            src={mainImgObject.newsletterBg}
            alt="fill murray"
            className="w-[100vw] h-full object-cover"
          />
          {/* Overlay */}
          <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-black/90"></div>
        </Background>
      </Parallax>

      <div className="ralative  header-contents absolute top-1/2 right-0 -translate-y-1/2 flex flex-col items-end px-4">
        <p className="text-amber-100 font-exd text-[15px] tracking-[4px] -mb-3">
          More flavor for less
        </p>
        <h2 className="font-extrabold text-right text-[80px] text-white tracking-wider">
          Good food and Great vibes
        </h2>

        <button className="btn">View Menu</button>
      </div>

      {/* img tacos*/}
      <div className="absolute right-0 top-50">
        <img src={mainImgObject.newsletterTacos} alt="" className="w-[500px]" />
      </div>

      {/* img sandwitch */}
      <div className=" absolute -right-30 -top-50">
        <img
          src={mainImgObject.newsletterSandwitch}
          alt=""
          className="w-[300px]"
        />
      </div>
    </div>
  );
};

export default Newsletter;
