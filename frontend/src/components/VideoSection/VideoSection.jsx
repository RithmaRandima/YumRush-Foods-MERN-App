import React from "react";
import { FaPlayCircle } from "react-icons/fa";
import { ReactTyped } from "react-typed";
import { mainImgObject } from "../../assets/assets.js";

const VideoSection = () => {
  return (
    <div className="h-[40vh] md:h-[60vh] w-full mx-auto bg-black my-6 relative overflow-hidden">
      {/* VIDEO */}
      <video
        autoPlay
        loop
        muted
        id="video"
        className="w-full h-full object-cover"
      >
        <source src={mainImgObject.home_video} type="video/mp4" />
      </video>

      {/* OVERLAY */}
      <div className="absolute inset-0 bg-gradient-to-l from-black/40 to-black flex flex-col justify-center items-start text-white px-4 sm:pl-7">
        <div className="text-center md:text-left border-2 border-amber-300 p-4 sm:p-10 w-full sm:w-auto">
          <h1 className="text-[28px] sm:text-[40px] md:text-[70px] mb-3 leading-tight">
            Dining
            <span className="text-amber-300 ml-2 sm:ml-4 font-bold">
              <ReactTyped
                strings={["Experiences", "Flavors", "Moments"]}
                typeSpeed={120}
                backSpeed={60}
                loop
              />
            </span>
          </h1>

          <p className="hidden sm:block w-full sm:w-[650px] tracking-[1px] text-white/60 leading-6 text-sm sm:text-base">
            Indulge in exceptional cuisine crafted from the finest ingredients.
            Our restaurant brings together global flavors and innovative dishes
            to create unforgettable dining experiences for every guest. Savor
            every bite and make every visit a celebration of taste and
            sophistication.
          </p>

          <p className="sm:hidden w-full tracking-[1px] text-white/60 leading-6 text-sm sm:text-base">
            Fine dining with the best ingredients, global flavors, and creative
            dishes
          </p>
        </div>
      </div>
    </div>
  );
};

export default VideoSection;
