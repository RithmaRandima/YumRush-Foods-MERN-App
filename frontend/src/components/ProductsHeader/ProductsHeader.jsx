import React from "react";
import { Background, Parallax } from "react-parallax";
import { mainImgObject } from "../../assets/assets";
import "./ProductsHeader.css";
const ProductsHeader = () => {
  return (
    <>
      // desktop
      <div className="hidden md:block relative h-[60vh] ">
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

        <div className="ralative  header-contents absolute top-1/2 left-0 -translate-y-1/2 flex flex-col items-start px-4">
          <h2 className="font-extrabold text-right text-[70px] text-white tracking-wider">
            Taste the Difference
          </h2>
          <p className="text-amber-100 text-left text-[15px] w-[70%] tracking-[4px] -mb-3">
            Choose from our wide variety of dishes and enjoy delicious meals at
            your convenience
          </p>
        </div>

        {/* img tacos*/}
        <div className="absolute right-0 -bottom-40 bg-[#f0f0f] rounded-t-full">
          <img
            src={mainImgObject.newsletterTacos}
            alt=""
            className="w-[330px]"
          />
        </div>

        {/* img salad*/}
        <div className="absolute -right-20 bottom-10 bg-[#f0f0f] rounded-t-full">
          <img src={mainImgObject.menu_6} alt="" className="w-[200px]" />
        </div>

        {/* img pasta*/}
        <div className="absolute right-38 top-0 bg-[#f0f0f] rounded-t-full">
          <img src={mainImgObject.menu_7} alt="" className="w-[110px]" />
        </div>

        {/* img sandwitch */}
        <div className=" absolute right-1 top-6">
          <img
            src={mainImgObject.newsletterSandwitch}
            alt=""
            className="w-[140px]"
          />
        </div>
      </div>
      // mobile
      <div className="md:hidden relative h-[50vh] ">
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

        <div className="ralative header-contents absolute top-15  left-3  flex flex-col items-start px-4">
          <h2 className="font-extrabold text-[44px] mb-3 text-white tracking-wider">
            Taste the Difference
          </h2>
          <p className="text-amber-100 text-left text-[15px] w-[90%] tracking-[4px] -mb-3">
            Choose from our wide variety of dishes and enjoy delicious meals
          </p>
        </div>

        {/* img tacos*/}
        <div className="absolute right-0 -bottom-30 bg-[#f0f0f] rounded-t-full">
          <img
            src={mainImgObject.newsletterTacos}
            alt=""
            className="w-[270px]"
          />
        </div>
      </div>
    </>
  );
};

export default ProductsHeader;
