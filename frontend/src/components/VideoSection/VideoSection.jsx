import React from "react";
import { FaPlayCircle } from "react-icons/fa";
import { ReactTyped } from "react-typed";

import { mainImgObject } from "../../assets/assets.js";

const VideoSection = () => {
  return (
    <div className="h-[60vh] md:h-[60vh] w-[100%] mx-auto bg-black my-6 relative">
      <video
        autoPlay
        loop
        muted
        id="video"
        className="w-[100%] h-[60vh] mt-20 md:h-[60vh] object-cover"
      >
        <source src={mainImgObject.home_video} type="video/mp4" />
      </video>
      <div className="absolute w-[100%] h-[100%] bg-gradient-to-l from-black/20 to-black top-0 left-0 flex flex-col justify-center items-start text-white pl-7">
        <div className="text-left bg-re border-2 border-amber-300 p-10">
          <h1 className=" text-[40px] md:text-[70px] mb-3">
            Dining
            <span className="text-amber-300 ml-4 font-bold">
              <ReactTyped
                strings={["Experiences", "Flavors", "Moments"]}
                typeSpeed={490}
                loop
              />
            </span>
          </h1>
          <p className="w-[90%] tracking-[1px] text-white/40 leading-6 md:w-[650px]">
            Indulge in exceptional cuisine crafted from the finest ingredients.
            Our restaurant brings together global flavors and innovative dishes
            to create unforgettable dining experiences for every guest. Savor
            every bite and make every visit a celebration of taste and
            sophistication.
          </p>
        </div>
      </div>
    </div>
  );
};

export default VideoSection;
