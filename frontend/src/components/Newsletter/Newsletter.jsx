import React, { useEffect, useState } from "react";
import { Background, Parallax } from "react-parallax";
import { mainImgObject } from "../../assets/assets";
import { motion, useScroll, useTransform } from "framer-motion";

const Newsletter = () => {
  const style = {
    fontFamily: "Great Vibes, cursive",
  };

  // desktop
  const [scrollY, setScrollY] = useState(0);
  const baseOffset1 = 1500;
  const baseOffset2 = 1850;
  const baseOffset3 = 2100;
  useEffect(() => {
    const handleScroll = () => setScrollY(window.scrollY);
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  // mobile
  // mobile

  const [scrollYMobile, setScrollYMobile] = useState(0);
  const baseOffsetMobile1 = 700;
  const baseOffsetMobile3 = 1300;

  useEffect(() => {
    const handleScroll = () => setScrollYMobile(window.scrollY);

    window.addEventListener("scroll", handleScroll);

    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <>
      {/* desktop */}
      <div className="hidden elative h-full p-5 px-20 md:flex flex-col gap-10 overflow-hidden">
        {/* top */}
        <div className=" flex ">
          <div className="flex-1 flex justify-center items-center text-center">
            {/* text section */}
            <motion.div
              className=""
              style={{
                transform: `translateY(${baseOffset1 + scrollY * -0.5}px)`,
              }}
            >
              {/* header */}
              <div className="text-center">
                <h1
                  style={style}
                  className="text-amber-600 font-exd text-[25px] tracking-[7px] -mb-3"
                >
                  Chef
                </h1>
                <h1 className="text-white uppercase text-[50px] tracking-[1px] font-extralight mb-4">
                  Philosophy
                </h1>
              </div>
              <p className="text-white text-[19px] font-extralight">
                "We craft every dish with passion, using fresh ingredients and
                thoughtful flavors, creating memorable dining experiences where
                great food, warm service, and genuine hospitality bring people
                together at every meal."
              </p>

              <p className="underline text-amber-300 text-[20px] mt-5">
                Learn More
              </p>
            </motion.div>
          </div>
          <div className=" flex-1 px-10 h-150">
            <img
              src={mainImgObject.phe}
              alt=""
              className="h-full w-full object-cover"
            />
          </div>
        </div>
        {/* middle */}
        <div className=" flex ">
          <div className="relative flex-2 px-5 pr-15 h-120">
            <img
              src={mainImgObject.bigRestaurant}
              alt=""
              className="h-full w-full object-cover"
            />
            <div className="absolute -bottom-30 bg-[#0f0f0f] h-[360px] w-[290px] pt-4 pr-4 -left-5">
              <img
                src={mainImgObject.smallRestaurant}
                alt=""
                className="h-full w-full object-cover"
              />
            </div>
          </div>

          <div className=" flex-1">
            {/* text section */}
            <motion.div
              className=""
              style={{
                transform: `translateY(${baseOffset2 + scrollY * -0.5}px)`,
              }}
            >
              {/* header */}
              <div className="text-center">
                <h1
                  style={style}
                  className="text-amber-600 font-exd text-[25px] tracking-[7px] -mb-4"
                >
                  Check out
                </h1>
                <h1 className="uppercase text-white text-[40px] tracking-[1px] font-extralight mb-3">
                  Restaurant
                </h1>
              </div>
              <p className="text-white text-center text-[19px] font-extralight">
                "At our restaurant, every dish is a celebration of flavor and
                tradition. We use the freshest ingredients, craft each plate
                with care, and serve it with warmth, creating a dining
                experience that brings friends and family together over
                unforgettable meals."
              </p>

              <p className="underline text-amber-300 text-center text-[17px] mt-5">
                Find Us
              </p>
            </motion.div>
          </div>
        </div>
        {/* bottom */}
        <div className=" flex ">
          <div className=" flex-1 flex justify-center items-center text-center">
            {/* text section */}
            <motion.div
              className=""
              style={{
                transform: `translateY(${baseOffset3 + scrollY * -0.5}px)`,
              }}
            >
              {/* header */}
              <div className="text-center">
                <h1
                  style={style}
                  className="text-amber-600 font-exd text-[25px] tracking-[7px] -mb-6"
                >
                  Meet
                </h1>
                <h1 className="text-white uppercase text-[50px] tracking-[1px] font-extralight mb-4">
                  Our Chef
                </h1>
              </div>
              <p className="text-white text-[19px] font-extralight">
                "Our chefs are the heart of every meal, blending skill,
                creativity, and passion in every dish. From hand-selected
                ingredients to artful presentation, they craft experiences that
                delight the senses and celebrate the joy of exceptional
                cuisine."
              </p>

              <p className="underline text-amber-300 text-[20px] mt-5">
                Watch Us
              </p>
            </motion.div>
          </div>
          <div className="relative flex-1 px-10 h-150">
            <img
              src={mainImgObject.chef}
              alt=""
              className="h-full w-full object-cover"
            />
          </div>
        </div>
      </div>

      {/* mobile */}
      <div className="md:hidden relative h-[90vh] p-5 flex flex-col overflow-hidden ">
        {/* top */}
        <div className="flex text-center ">
          {/* text section */}
          <motion.div
            className=" w-[80%] "
            style={{
              transform: `translateY(${
                baseOffsetMobile1 + scrollYMobile * -0.3
              }px)`,
            }}
          >
            {/* header */}
            <div className="text-center">
              <h1
                style={style}
                className="text-amber-600 font-exd text-[20px] tracking-[7px] -mb-3"
              >
                Chef
              </h1>
              <h1 className="text-white uppercase text-[30px] tracking-[1px] font-extralight mb-4">
                Philosophy
              </h1>
            </div>

            <p className="text-white text-[16px] font-extralight">
              "We craft every dish with passion, using fresh ingredients and
              thoughtful flavors, creating memorable dining experiences where
              great food, warm service, and genuine hospitality bring people
              together at every meal."
            </p>

            <p className="underline text-amber-300 text-[20px] mt-5">
              Learn More
            </p>
          </motion.div>
        </div>

        {/* bottom */}
        <div className="flex items-end justify-end text-center">
          {/* text section */}
          <motion.div
            className=" w-[80%]"
            style={{
              transform: `translateY(${
                baseOffsetMobile3 + scrollYMobile * -0.5
              }px)`,
            }}
          >
            {/* header */}
            <div className="text-center w-full">
              <h1
                style={style}
                className="text-amber-600 font-exd text-[20px] tracking-[7px] -mb-3"
              >
                Meet
              </h1>

              <h1 className="text-white uppercase text-[30px] tracking-[1px] font-extralight mb-4">
                Our Chef
              </h1>
            </div>

            <p className="text-white text-[16px] font-extralight">
              "Our chefs are the heart of every meal, blending skill,
              creativity, and passion in every dish. From hand-selected
              ingredients to artful presentation, they craft experiences that
              delight the senses and celebrate the joy of exceptional cuisine."
            </p>

            <p className="underline text-amber-300 text-[20px] mt-5">
              Watch Us
            </p>
          </motion.div>
        </div>

        <div className="absolute w-[90%] h-[80vh] top-[50%] -translate-y-[50%] -z-2 left-[50%] -translate-x-[50%] ">
          <img src={mainImgObject.phe} alt="" className="h-full object-cover" />
        </div>
        {/* overflow */}
        <div className="absolute w-full h-full bg-black/85  top-[50%] -translate-y-[50%] -z-1 left-[50%] -translate-x-[50%] "></div>
      </div>
    </>
  );
};

export default Newsletter;
