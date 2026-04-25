import React from "react";
import { mainImgObject } from "../../assets/assets";

const AboutSection = () => {
  const style = {
    fontFamily: "Great Vibes, cursive",
  };

  return (
    <div className="text-white pt-10">
      {/* toppart */}
      <div className="w-[65%] mx-auto">
        {/* header */}
        <div className="text-center">
          <h1 className="text-amber-100 font-exd text-[17px] tracking-[4px] -mb-1">
            Discover
          </h1>
          <h1
            style={style}
            className="text-amber-300 text-[60px] tracking-[10px] font-bold"
          >
            Our Story
          </h1>
        </div>
        <h1 className="text-[22px] my-7 font-extralight tracking-[2px] leading-10">
          "Cooking is like fashion—always evolving. This restaurant is
          passionate about exploring new flavors and ingredients from around the
          world. Inspired by places like Australia, the Bahamas, Budapest, and
          Moscow, every new ingredient becomes part of a unique and delicious
          dish."
        </h1>
        <p className="text-[15px] mb-7  tracking-[2px] leading-7">
          At our restaurant, dining is an art of elegance and refinement. Each
          dish is crafted from the finest ingredients, blending global
          inspirations with meticulous attention to detail. Guests are invited
          to savor sophisticated flavors in an ambiance of contemporary luxury.
          Every visit promises an exceptional experience, where exquisite
          cuisine meets attentive service and memorable moments.
        </p>

        <p className="text-[15px] mb-7 tracking-[2px] leading-7">
          Our culinary philosophy blends innovation with artistry, transforming
          the finest ingredients into exquisite dishes. The menu evolves with
          the seasons, showcasing global inspirations while honoring classic
          techniques. Every detail—from presentation to service—is thoughtfully
          crafted to offer a refined and memorable dining experience. At our
          restaurant, guests are not simply dining; they are immersed in a world
          of sophistication, where each visit celebrates exceptional flavors,
          elegant surroundings, and the art of fine cuisine.
        </p>
      </div>
      {/* bottom */}
      <div className="relative w-full pl-15 h-130">
        <h1 className="text-[70px] text-amber-300/10 font-extrabold leading-15 tracking-[2px] w-[500px]">
          Where food Speak with Your plate
        </h1>

        {/* img salad */}
        <div className="w-70 h-70 absolute right-10 -top-20 animate-spin [animation-duration:90s]">
          <img
            src={mainImgObject.menu_1}
            alt=""
            className="w-full h-full object-contain"
          />
        </div>

        {/* img sandwitch*/}
        <div className="absolute w-33 h-33 right-5 top-60 animate-spin [animation-duration:50s]">
          <img
            src={mainImgObject.about_1}
            alt=""
            className="w-full h-full object-cover"
          />
        </div>

        {/* img meat */}
        <div className="w-105 h05 absolute right-40 top-50 animate-spin [animation-duration:130s]">
          <img
            src={mainImgObject.about_2}
            alt=""
            className="w-full h-full object-contain"
          />
        </div>

        {/* img noodls */}
        <div className="w-90 z-5 h-90 absolute left-20 top-45 animate-spin [animation-duration:130s]">
          <img
            src={mainImgObject.menu_8}
            alt=""
            className="w-full h-full object-contain"
          />
        </div>

        {/* img beef-sandwitch */}
        <div className="w-30 z-2 h-30 absolute left-105 top-50 animate-spin [animation-duration:30s]">
          <img
            src={mainImgObject.about_3}
            alt=""
            className="w-full h-full object-contain"
          />
        </div>
      </div>
    </div>
  );
};

export default AboutSection;
