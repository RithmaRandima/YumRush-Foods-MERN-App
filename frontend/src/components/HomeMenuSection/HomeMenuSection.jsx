import React from "react";
import HomeMenuCard from "../HomeMenuCard/HomeMenuCard";
import { menu_list } from "../../assets/assets";

import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";

const HomeMenuSection = () => {
  const desktopSettings = {
    infinite: true,
    speed: 500,
    slidesToShow: 5,
    slidesToScroll: 1,
    autoplay: true,
    autoplaySpeed: 3000,
    arrows: false,
  };

  const mobileSettings = {
    infinite: true,
    speed: 500,
    slidesToShow: 2,
    slidesToScroll: 1,
    autoplay: true,
    autoplaySpeed: 3000,
    arrows: false,
  };

  const style = {
    fontFamily: "Great Vibes, cursive",
  };

  return (
    <div className="py-10 mt-10">
      {/* ================= HEADER ================= */}
      {/* desktop */}
      <div className="hidden md:flex flex-col items-center">
        <h1
          style={style}
          className="text-amber-300 text-[60px] tracking-[10px] font-bold"
        >
          Explore Menu
        </h1>
        <p className="max-w-[60%] text-amber-100 text-center">
          Exercitation photo booth stumptown tote bag Banksy, elit small batch
          freegan sed. Craft beer elit seitan exercitation.
        </p>
      </div>
      {/* mobile */}
      <div className="w-[80%] mx-auto my-5 mt-10">
        <div className="text-center">
          <h1
            style={style}
            className="text-amber-300 text-[32px] tracking-[6px] font-bold"
          >
            Explore Menu
          </h1>
        </div>
      </div>

      {/* ================= DESKTOP SLIDER ================= */}
      <div className="hidden md:block w-full max-w-[1200px] mx-auto mt-12">
        <Slider {...desktopSettings}>
          {menu_list.map((item, index) => (
            <HomeMenuCard key={index} item={item} />
          ))}
        </Slider>
      </div>

      {/* ================= MOBILE SLIDER (2 ITEMS) ================= */}
      <div className="md:hidden w-full mt-10 px-4">
        <Slider {...mobileSettings}>
          {menu_list.map((item, index) => (
            <div key={index} className="px-2">
              <HomeMenuCard item={item} />
            </div>
          ))}
        </Slider>
      </div>
    </div>
  );
};

export default HomeMenuSection;
